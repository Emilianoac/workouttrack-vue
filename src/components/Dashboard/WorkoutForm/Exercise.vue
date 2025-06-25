<script lang="ts" setup>
  import { toRef } from "vue";
  import type { RoutineExercise, Routine } from "@/types/routines";
  import type { NewSetLog } from "@/types/workoutLog";
  import Set from "@/components/Dashboard/WorkoutForm/Set.vue";

  defineOptions({
    name: "ExerciseComponent",
  });

  // Define emits for the component to communicate with parent
  const emit = defineEmits<{
    (e: "setExerciseTargetData", routines: Routine[], exerciseIndex: number): void;
    (e: "addSet", exerciseIndex: number): void;
  }>();

  const props = defineProps<{
    exercise: {
      exerciseId: string;
      exerciseTargetData: RoutineExercise | null;
      sets_logs: NewSetLog[];
    };
    routines: Routine[];
    exerciseIndex: number;
  }>();

  function onSetExerciseTargetData(routines: Routine[], exerciseIndex: number) {
    emit("setExerciseTargetData", routines, exerciseIndex);
  }

  function onAddSet(exerciseIndex: number) {
    emit("addSet", exerciseIndex);
  }

  // Convert props to refs for reactivity
  const exercise = toRef(props, "exercise");
</script>

<template>
  <h3 class="font-semibold">Ejercicio {{ exerciseIndex + 1 }}</h3>

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
    <div class="flex items-center justify-end" v-if="exercise?.exerciseTargetData">
      <button @click="onAddSet(exerciseIndex)" type="button" class="btn-secondary mt-2 text-sm">+ Añadir set</button>
    </div>
  </div>
</template>

<style lang="postcss"></style>
