<script setup lang="ts">
  import { useRoutine } from "@/composables/useRoutine";
  import useWorkoutLogger from "@/composables/useWorkoutLogger";
  import Exercise from "./Exercise.vue";

  defineOptions({
    name: "WorkoutForm",
  });

  const { routines } = useRoutine();
  const {
    selectedRoutineId,
    workoutDate,
    bodyWeight,
    exercises,
    addExercise,
    addSet,
    saveData,
    setExerciseTargetData,
  } = useWorkoutLogger();
</script>

<template>
  <div class="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow">
    <h2 class="text-xl font-bold mb-4">Registrar entrenamiento</h2>

    <form @submit.prevent="saveData()" class="space-y-4">
      <div class="grid grid-cols-2 gap-2 w-full">
        <!-- Date -->
        <div>
          <label class="block text-sm font-medium mb-1" for="fecha">Fecha </label>
          <input id="fecha" v-model="workoutDate" type="date" class="input" />
        </div>

        <!-- Body Weight -->
        <div>
          <label for="body_weight" class="block text-sm font-medium mb-1">Peso corporal</label>
          <input id="body_weight" class="input" v-model="bodyWeight" type="number" step="any" inputmode="decimal" />
        </div>
      </div>

      <!-- Select Routine -->
      <div>
        <label class="block text-sm font-medium mb-1" for="routine">Seleccionar Rutina</label>
        <select v-model="selectedRoutineId" id="routine" class="input">
          <option value="" disabled>Selecciona una rutina</option>
          <option v-for="routine in routines" :key="routine.id" :value="routine.id">
            {{ routine.name }}
          </option>
        </select>
      </div>

      <!-- Exercises -->
      <div v-for="(ej, i) in exercises" :key="i" class="p-3 border dark:border-slate-600 rounded-xl space-y-3">
        <Exercise
          :exercise="ej"
          :routines="routines"
          :exerciseIndex="i"
          @setExerciseTargetData="setExerciseTargetData"
          @addSet="addSet"
        />
      </div>

      <!-- Botones -->
      <div class="flex justify-end gap-2">
        <button @click="addExercise" type="button" class="btn-secondary">+ Añadir ejercicio</button>
        <button type="submit" class="btn-primary">Guardar</button>
      </div>
    </form>
  </div>
</template>

<style lang="postcss">
  .input {
    @apply w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-700 dark:text-white dark:border-slate-600;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700;
  }

  .btn-secondary {
    @apply px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300;
  }
</style>
