<script lang="ts" setup>
  import { toRef } from "vue";
  import type { RoutineExercise, Routine } from "@/types/routines";
  import type { NewSetLog } from "@/types/workoutLog";

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
  <div class="grid grid-cols-4 gap-2">
    <!-- sets -->
    <div>
      <label :for="'sets' + exerciseIndex" class="block text-sm font-medium mb-1">Sets esperados</label>
      <input
        :id="'sets' + exerciseIndex"
        type="number"
        class="input"
        :value="exercise?.exerciseTargetData?.sets || 0"
        disabled
      />
    </div>

    <!-- Reps -->
    <div>
      <label :for="'reps' + exerciseIndex" class="block text-sm font-medium mb-1">
        Repeticiones esperadas por set (si aplica)
      </label>
      <input
        :id="'reps' + exerciseIndex"
        type="number"
        class="input"
        :value="exercise?.exerciseTargetData?.reps || 0"
        disabled
      />
    </div>

    <!-- Duration (if applicable) -->
    <div>
      <label :for="'duration_sec' + exerciseIndex" class="block text-sm font-medium mb-1">
        Duracion esperada por set (si aplica)
      </label>
      <input
        :id="'duration_sec' + exerciseIndex"
        type="number"
        class="input"
        :value="exercise?.exerciseTargetData?.duration_sec || 0"
        disabled
      />
    </div>

    <!-- Rest between sets -->
    <div>
      <label :for="'rest_between_sets_sec' + exerciseIndex" class="block text-sm font-medium mb-1">
        Descanso esperado entre sets (segundos)
      </label>
      <input
        :id="'rest_between_sets_sec' + exerciseIndex"
        type="number"
        class="input"
        :value="exercise?.exerciseTargetData?.rest_seconds || 0"
        disabled
      />
    </div>
  </div>

  <!-- Sets -->
  <div
    v-for="set in exercise?.sets_logs"
    :key="`set-${exerciseIndex}-${set.set_number}`"
    class="mt-3 p-2 border dark:border-slate-600 rounded-lg"
  >
    <div class="flex items-center justify-between mb-2">
      <!-- Set Number -->
      <h4 class="font-semibold mb-2">Set {{ set.set_number }}</h4>

      <!-- Is Body Weight -->
      <div>
        <label :for="'set_is_body_weight' + exerciseIndex + '-' + set.set_number" class="inline-flex items-center">
          <input
            :id="'set_is_body_weight' + exerciseIndex + '-' + set.set_number"
            v-model="set.is_body_weight"
            type="checkbox"
            class="form-checkbox"
          />
          <span class="ml-2 text-sm">Se usa el peso corporal</span>
        </label>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-2">
      <!-- Weight -->
      <div>
        <label :for="'set_weight' + exerciseIndex + '-' + set.set_number" class="block text-sm font-medium mb-1"
          >Peso (kg)</label
        >
        <input
          :id="'set_weight' + exerciseIndex + '-' + set.set_number"
          v-model.number="set.weight_kg"
          type="number"
          class="input"
        />
      </div>

      <!-- Reps -->
      <div>
        <label :for="'set_reps' + exerciseIndex + '-' + set.set_number" class="block text-sm font-medium mb-1"
          >Repeticiones</label
        >
        <input
          :id="'set_reps' + exerciseIndex + '-' + set.set_number"
          v-model.number="set.reps"
          type="number"
          class="input"
        />
      </div>

      <!-- Duration -->
      <div>
        <label :for="'set_duration_sec' + exerciseIndex + '-' + set.set_number" class="block text-sm font-medium mb-1"
          >Duración (segundos)</label
        >
        <input
          :id="'set_duration_sec' + exerciseIndex + '-' + set.set_number"
          v-model.number="set.duration_sec"
          type="number"
          class="input"
        />
      </div>

      <!-- Rest between sets -->
      <div>
        <label
          :for="'set_rest_between_sets_sec' + exerciseIndex + '-' + set.set_number"
          class="block text-sm font-medium mb-1"
          >Descanso entre sets (segundos)</label
        >
        <input
          :id="'set_rest_between_sets_sec' + exerciseIndex + '-' + set.set_number"
          v-model.number="set.rest_between_sets_sec"
          type="number"
          class="input"
        />
      </div>
    </div>
  </div>

  <!-- Add Set Button -->
  <div class="flex items-center justify-end">
    <button @click="onAddSet(exerciseIndex)" type="button" class="btn-secondary mt-2">+ Añadir set</button>
  </div>
</template>

<style lang="postcss"></style>
