<script lang="ts" setup>
  import { toRef } from "vue";
  import type { RoutineExercise, Routine } from "@/types/routine";
  import type { NewSetLog } from "@/types/workoutLog";
  import Set from "@/components/Dashboard/WorkoutForm/Set.vue";
  import TrashIcon from "@/components/Icons/Trash.vue";

  defineOptions({
    name: "ExerciseComponent",
  });

  type ZodErrorNode = {
    errors?: string[];
    properties?: Record<string, ZodErrorNode>;
    items?: ZodErrorNode[];
  };

  // Define emits for the component to communicate with parent
  const emit = defineEmits<{
    (e: "setExerciseTargetData", routines: Routine[], exerciseIndex: number): void;
    (e: "addSet", exerciseIndex: number): void;
    (e: "removeSet", exerciseIndex: number, setIndex: number): void;
    (e: "removeExercise", exerciseIndex: number): void;
  }>();

  const props = defineProps<{
    exercise: {
      exerciseId: string;
      exerciseTargetData: RoutineExercise | null;
      sets_logs: NewSetLog[];
    };
    errors?: ZodErrorNode | null;

    routines: Routine[];
    exerciseIndex: number;
  }>();

  function onSetExerciseTargetData(routines: Routine[], exerciseIndex: number) {
    emit("setExerciseTargetData", routines, exerciseIndex);
  }

  function onAddSet(exerciseIndex: number) {
    emit("addSet", exerciseIndex);
  }

  function onRemoveSet(exerciseIndex: number, setIndex: number) {
    emit("removeSet", exerciseIndex, setIndex);
  }

  function onRemoveExercise(exerciseIndex: number) {
    emit("removeExercise", exerciseIndex);
  }

  // Convert props to refs for reactivity
  const exercise = toRef(props, "exercise");
</script>

<template>
  <div class="flex items-center justify-between mb-4">
    <h3 class="font-semibold">Ejercicio {{ exerciseIndex + 1 }}</h3>
    <button
      v-if="exerciseIndex + 1 > 1"
      @click="onRemoveExercise(exerciseIndex)"
      type="button"
      title="Eliminar ejercicio"
      class="bg-white border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed w-8 h-8 flex items-center justify-center"
    >
      <TrashIcon class="w-4 h-4" />
    </button>
  </div>

  <div class="p-4 bg-white dark:bg-slate-800 rounded-xl shadow mb-4">
    <!-- Select Exercise -->
    <div>
      <label :for="'exercise_id' + exerciseIndex" class="block text-sm font-medium mb-1">Seleccionar ejercicio</label>
      <select
        :id="'exercise_id' + exerciseIndex"
        v-model="exercise!.exerciseId"
        class="input"
        @change="onSetExerciseTargetData(routines, exerciseIndex)"
      >
        <option value="" disabled>Selecciona un ejercicio</option>
        <template v-for="routine in routines" :key="routine.id">
          <optgroup :label="routine.name">
            <option v-for="data in routine.routines_exercises" :key="data.id" :value="data.exercise.id">
              {{ data.exercise.name }}
            </option>
          </optgroup>
        </template>
      </select>
      <span v-if="errors?.properties?.exerciseId" class="text-red-500 text-sm block mt-2">
        {{ errors?.properties?.exerciseId?.errors?.[0] }}
      </span>
    </div>

    <!-- Exercise target data -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-2 mt-5" v-if="exercise?.exerciseTargetData">
      <!-- sets -->
      <div class="mb-2 lg:mb-0">
        <span class="block text-sm font-medium mb-1">Sets esperados</span>
        <span class="text-sm font-bold"> {{ exercise?.exerciseTargetData?.sets || 0 }} </span>
      </div>

      <!-- Reps -->
      <div class="mb-2 lg:mb-0" v-if="exercise?.exerciseTargetData?.measurement === 'reps'">
        <span class="block text-sm font-medium mb-1">Repeticiones esperadas por set</span>
        <span class="text-sm font-bold"> {{ exercise?.exerciseTargetData?.reps || 0 }} </span>
      </div>

      <!-- Duration (if applicable) -->
      <div class="mb-2 lg:mb-0" v-if="exercise?.exerciseTargetData?.measurement === 'time'">
        <span class="block text-sm font-medium mb-1">Duración esperada por set</span>
        <span class="text-sm font-bold">
          {{ exercise?.exerciseTargetData?.duration_sec ? exercise.exerciseTargetData.duration_sec + " seg" : "N/A" }}
        </span>
      </div>

      <!-- Rest between sets -->
      <div class="mb-2 lg:mb-0">
        <span class="block text-sm font-medium mb-1">Descanso esperado entre sets (segundos)</span>
        <span class="text-sm font-bold">
          {{ exercise?.exerciseTargetData?.rest_seconds ? exercise.exerciseTargetData.rest_seconds + " seg" : "N/A" }}
        </span>
      </div>
    </div>

    <!-- Sets -->
    <template v-if="exercise.exerciseTargetData">
      <Set
        v-for="set in exercise?.sets_logs"
        :key="`set-${exerciseIndex}-${set.set_number}`"
        :set="set"
        :exerciseIndex="exerciseIndex"
        :measurement="exercise.exerciseTargetData.measurement"
      />
    </template>

    <!-- Add Set Button -->
    <div class="flex items-center justify-end mt-3 gap-3" v-if="exercise?.exerciseTargetData">
      <button
        v-if="exercise?.sets_logs.length > 1"
        @click="onRemoveSet(exerciseIndex, exercise?.sets_logs.length - 1)"
        type="button"
        class="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Eliminar set
      </button>
      <button @click="onAddSet(exerciseIndex)" type="button" class="btn-primary text-sm">Añadir set</button>
    </div>
  </div>

  <!-- Set logs errors -->
  <span
    v-if="errors?.properties?.sets_logs && !errors?.properties?.exerciseId"
    class="text-red-500 text-sm block !mt-1"
  >
    {{ errors?.properties?.sets_logs?.errors?.[0] }}
  </span>
</template>

<style lang="postcss"></style>
