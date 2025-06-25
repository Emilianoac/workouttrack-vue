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
    removeExercise,
    addSet,
    removeSet,
    saveData,
    setExerciseTargetData,
    formFieldsErrors,
  } = useWorkoutLogger();
</script>

<template>
  <h1 class="text-2xl font-bold mb-5">Registrar entrenamiento</h1>
  <form @submit.prevent="saveData()" class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
      <!-- Date -->
      <div>
        <label class="block text-sm font-medium mb-1" for="fecha">Fecha </label>
        <input id="fecha" v-model="workoutDate" type="date" class="input" />
        <span v-if="formFieldsErrors?.workoutDate" class="text-red-500 text-sm mt-1" data-testid="workout-date-error">
          {{ formFieldsErrors.workoutDate.errors[0] }}
        </span>
      </div>

      <!-- Body Weight -->
      <div>
        <label for="body_weight" class="block text-sm font-medium mb-1">Peso corporal (kg)</label>
        <input id="body_weight" class="input" v-model="bodyWeight" type="number" step="any" inputmode="decimal" />
        <span v-if="formFieldsErrors?.bodyWeight" class="text-red-500 text-sm mt-1" data-testid="body-weight-error">
          {{ formFieldsErrors.bodyWeight.errors[0] }}
        </span>
      </div>

      <!-- Select Routine -->
      <div class="col-span-2">
        <label class="block text-sm font-medium mb-1" for="routine">Seleccionar Rutina</label>
        <select v-model="selectedRoutineId" id="routine" class="input">
          <option value="" disabled>Selecciona una rutina</option>
          <option v-for="routine in routines" :key="routine.id" :value="routine.id">
            {{ routine.name }}
          </option>
        </select>
        <span
          v-if="formFieldsErrors?.selectedRoutineId"
          class="text-red-500 text-sm mt-1"
          data-testid="selected-routine-id-error"
        >
          {{ formFieldsErrors.selectedRoutineId.errors[0] }}
        </span>
      </div>
    </div>

    <template v-if="selectedRoutineId">
      <!-- Exercises -->
      <Exercise
        v-for="(ej, i) in exercises"
        :key="i"
        :exercise="ej"
        :routines="routines"
        :exerciseIndex="i"
        :errors="formFieldsErrors?.exercises?.items?.[i] ?? null"
        @setExerciseTargetData="setExerciseTargetData"
        @addSet="addSet"
        @removeSet="removeSet"
        @removeExercise="removeExercise"
      />
    </template>

    <!-- Botones -->
    <div class="flex justify-end gap-2">
      <button
        v-if="selectedRoutineId"
        @click="addExercise"
        type="button"
        class="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-200"
      >
        + Añadir ejercicio
      </button>
      <button type="submit" class="btn-primary">Guardar entrenamiento</button>
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
    @apply disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600;
  }

  .btn-secondary {
    @apply px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300;
    @apply disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200;
  }

  .btn-danger {
    @apply px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700;
    @apply disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600;
  }
</style>
