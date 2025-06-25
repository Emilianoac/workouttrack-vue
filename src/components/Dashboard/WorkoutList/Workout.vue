<script lang="ts" setup>
  import formatDate from "@/utils/formatDate";
  import type { WorkoutLog } from "@/types/workoutLog";

  defineOptions({
    name: "WorkoutListView",
  });

  defineProps<{
    workoutLog: WorkoutLog;
  }>();
</script>

<template>
  <article class="workout-log">
    <!-- Workout log Header -->
    <header class="flex justify-between items-center mb-4">
      <!-- Date -->
      <span class="font-bold text-sm bg-blue-100 text-blue-600 py-1 px-2 rounded-md">{{
        formatDate(workoutLog.created_at)
      }}</span>
      <!-- Weight -->
      <span class="text-sm"
        >Peso Actual: <strong>{{ workoutLog.body_weight_kg }} kg</strong>
      </span>
    </header>

    <!-- Exercise -->
    <article v-for="entry in workoutLog.workout_log_entries" :key="entry.id" class="rounded-lg shadow-sm mb-5">
      <!-- Exercise Name -->
      <h4 class="text-[1.2em] font-bold mb-2">{{ entry.exercise.name }}</h4>
      <!-- Exercise Targets -->
      <div class="block md:flex items-center mb-4 gap-4 text-sm">
        <!-- Target exercise sets -->
        <p>
          Sets: <strong>{{ entry.target_sets }}</strong>
        </p>
        <!-- Target exercise reps -->
        <p v-if="entry.target_reps">
          Repeticiones esperadas por set: <strong>{{ entry.target_reps }}</strong>
        </p>
        <!-- Target exercise duration -->
        <p v-if="entry.target_duration_sec">
          Duración esperada por set:
          <strong> {{ entry.target_duration_sec }} seg </strong>
        </p>
        <!-- Target rest between sets -->
        <p v-if="entry.target_rest_between_sets_sec">
          Descanso esperado entre sets:
          <strong> {{ entry.target_rest_between_sets_sec }} seg </strong>
        </p>
      </div>

      <!-- Set Logs -->
      <ul class="list-none p-0 text-sm">
        <li class="bg-white dark:bg-slate-800 border-gray-200 p-4 rounded-md mb-4 last-of-type:mb-0">
          <div
            v-for="setLog in entry.set_logs"
            :key="setLog.id"
            class="border-b border-gray-200 dark:border-gray-700 mb-4 pb-4 last-of-type:pb-0 last-of-type:border-b-0 last-of-type:mb-0"
          >
            <h4 class="text-blue-500 font-bold text-[1.1em] mb-1">Set {{ setLog.set_number }}</h4>
            <ul class="workout-log-set-details">
              <li v-if="setLog.reps" class="mb-2">
                <p>
                  Repeticiones: <span class="font-semibold">{{ setLog.reps }}</span>
                </p>
              </li>
              <li v-if="setLog.duration_sec" class="mb-2">
                <p>
                  Duración del set: <span class="font-semibold">{{ setLog.duration_sec }}</span> seg
                </p>
              </li>
              <li class="mb-2">
                <p>
                  Peso utilizado:
                  <span class="font-semibold" v-if="setLog.is_body_weight && setLog.weight_kg">
                    Peso corporal + {{ setLog.weight_kg }} kg
                  </span>
                  <span class="font-semibold" v-else-if="!setLog.is_body_weight"> {{ setLog.weight_kg }} kg </span>
                  <span class="font-semibold" v-else> Peso corporal </span>
                </p>
              </li>
              <li>
                <p>
                  Descanso entre sets: <span class="font-semibold">{{ setLog.rest_between_sets_sec }} seg</span>
                </p>
              </li>
              <li v-if="setLog.notes">
                <p class="font-bold">Notas</p>
                <p>{{ setLog.notes }}</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </article>
  </article>
</template>

<style lang="postcss" scoped></style>
