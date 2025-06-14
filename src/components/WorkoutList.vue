<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { supabase } from "@/lib/supabaseClient";
  import formatDate from "@/utils/formatDate";
  import type { WorkoutLog } from "@/types/workoutLog";
  import WorkoutListSkeleton from "@/components/Skeletons/WorkoutList.vue";
  import ExportDataButton from "@/components/ExportDataButton.vue";

  const workoutsLogs = ref<WorkoutLog[] | []>([]);

  async function getWorkouts() {
    const { data } = await supabase
      .from("workout_logs")
      .select(
        `
        id,
        created_at,
        body_weight_kg,
        notes,
        routine:routine_id (
          id,
          name
        ),
        workout_log_entries (
          id,
          target_sets,
          target_reps,
          target_duration_sec,
          target_rest_between_sets_sec,
          exercise:exercise_id (
            id,
            name
          ),
          set_logs (
            id,
            set_number,
            reps,
            weight_kg,
            is_body_weight,
            rest_between_sets_sec,
            notes
          )
        )
      `,
      )
      .order("created_at", { ascending: false });

    workoutsLogs.value = data as unknown as WorkoutLog[];
  }

  onMounted(() => {
    getWorkouts();
  });
</script>

<template>
  <div class="flex justify-between items-center mb-5">
    <h1 class="text-2xl font-bold mb-4">Mis Entrenamientos</h1>
    <ExportDataButton />
  </div>

  <!-- Lista de entrenamientos -->
  <div class="workouts-logs-container">
    <article class="workout-log" v-for="log in workoutsLogs" :key="log.id">
      <div class="workout-log-header">
        <h2 class="workout-log-title">{{ formatDate(log.created_at) }}</h2>
        <div class="text-sm">
          Peso Actual: <strong>{{ log.body_weight_kg }} kg</strong>
        </div>
      </div>
      <div class="workout-log-body">
        <div>
          <ul class="workout-log-entries">
            <li v-for="entry in log.workout_log_entries" :key="entry.id" class="workout-log-entry">
              <p class="text-[1.2em] font-semibold">{{ entry.exercise.name }}</p>
              <div class="flex items-center my-4 gap-4">
                <p>
                  Sets: <strong>{{ entry.target_sets }}</strong>
                </p>
                <p v-if="entry.target_reps">
                  Repeticiones esperadas por set: <strong>{{ entry.target_reps }}</strong>
                </p>
                <p v-if="entry.target_duration_sec">
                  Duración esperada por set:
                  <strong> {{ entry.target_duration_sec }} seg </strong>
                </p>
                <p v-if="entry.target_rest_between_sets_sec">
                  Descanso esperado entre sets:
                  <strong> {{ entry.target_rest_between_sets_sec }} seg </strong>
                </p>
              </div>

              <div v-for="setLog in entry.set_logs" :key="setLog.id" class="workout-log-set">
                <h4 class="text-blue-500 font-bold text-[1.1em] mb-1">Set {{ setLog.set_number }}</h4>
                <ul class="workout-log-set-details">
                  <li v-if="setLog.reps">
                    <p>
                      Repeticiones: <span class="font-semibold">{{ setLog.reps }}</span>
                    </p>
                  </li>
                  <li v-if="setLog.duration_sec">
                    <p>
                      Duración del set: <span class="font-semibold">{{ setLog.duration_sec }}</span> seg
                    </p>
                  </li>
                  <li>
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
        </div>
      </div>
    </article>
  </div>
  <WorkoutListSkeleton v-if="!workoutsLogs.length" />
</template>

<style lang="postcss">
  .workouts-logs-container {
    @apply flex flex-col gap-4;
  }

  .workout-log-header {
    @apply flex justify-between items-center mb-4;
  }

  .workout-log-body {
    @apply rounded-lg shadow-sm mb-5;
  }

  .workout-log-title {
    @apply font-bold;
  }

  .workout-log-routine {
    @apply text-sm text-gray-500;
  }

  .workout-log-notes {
    @apply text-gray-700 dark:text-gray-300;
  }

  .workout-log-entries {
    @apply list-none p-0 text-sm;
  }

  .workout-log-entry {
    @apply bg-white dark:bg-gray-800 border-gray-200 p-4 rounded-md mb-4 last-of-type:mb-0;
  }

  .workout-log-set {
    @apply border-b border-gray-200 dark:border-gray-700 mb-4 pb-4 last-of-type:pb-0 last-of-type:border-b-0 last-of-type:mb-0;
  }

  .workout-log-set-details {
    li {
      @apply mb-2 last-of-type:mb-0;
    }
  }

  .workout-log-entry-notes {
    @apply text-sm text-gray-500;
  }
</style>
