<script lang="ts" setup>
  import { toRef } from "vue";
  import type { NewSetLog } from "@/types/workoutLog";

  defineOptions({
    name: "SetComponent",
  });

  const props = defineProps<{
    set: NewSetLog;
    exerciseIndex: number;
    measurement: "reps" | "time";
  }>();

  const set = toRef(props, "set");
</script>

<template>
  <div class="mt-3 p-2 border dark:border-slate-600 rounded-lg">
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

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-2">
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
      <div v-if="measurement === 'reps'">
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
      <div v-if="measurement === 'time'">
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
</template>

<style lang="postcss" scoped></style>
