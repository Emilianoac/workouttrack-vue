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
  <h1 class="text-2xl font-bold mb-5">Registrar entrenamiento</h1>
  <form @submit.prevent="saveData()" class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2 w-full p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
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
      <!-- Date -->
      <div>
        <label class="block text-sm font-medium mb-1" for="fecha">Fecha </label>
        <input id="fecha" v-model="workoutDate" type="date" class="input" />
      </div>

      <!-- Body Weight -->
      <div>
        <label for="body_weight" class="block text-sm font-medium mb-1">Peso corporal (kg)</label>
        <input id="body_weight" class="input" v-model="bodyWeight" type="number" step="any" inputmode="decimal" />
      </div>
    </div>

    <!-- Exercises -->
    <Exercise
      v-for="(ej, i) in exercises"
      :key="i"
      :exercise="ej"
      :routines="routines"
      :exerciseIndex="i"
      @setExerciseTargetData="setExerciseTargetData"
      @addSet="addSet"
    />

    <!-- Botones -->
    <div class="flex justify-end gap-2">
      <button @click="addExercise" type="button" class="btn-secondary">+ Añadir ejercicio</button>
      <button type="submit" class="btn-primary">Guardar</button>
    </div>
  </form>
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
