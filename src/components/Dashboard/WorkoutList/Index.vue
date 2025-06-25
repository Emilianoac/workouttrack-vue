<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { supabase } from "@/lib/supabaseClient";
  import type { WorkoutLog } from "@/types/workoutLog";
  import WorkoutLogComponent from "@/components/Dashboard/WorkoutList/Workout.vue";
  import ExportDataButton from "@/components/Dashboard/ExportDataButton.vue";
  import SkeletonList from "@/components/Skeletons/List.vue";

  defineOptions({
    name: "WorkoutListComponent",
  });

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
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
    <h1 class="text-2xl font-bold mb-4 order-2 mt-5 md:mt-0 md:mb-0 md:order-none">Mis Entrenamientos</h1>
    <ExportDataButton class="mx-auto mr-0 block text-[0.84em] md:text-base order-1 md:order-none" />
  </div>

  <!-- Workout Logs -->
  <div class="flex flex-col gap-4">
    <WorkoutLogComponent v-for="log in workoutsLogs" :key="log.id" :workoutLog="log" />
  </div>
  <SkeletonList :items="6" item-height="300px" v-if="workoutsLogs.length === 0" />
</template>

<style lang="postcss"></style>
