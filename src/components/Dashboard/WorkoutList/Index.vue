<script lang="ts" setup>
  import { useWorkout } from "@/composables/workouts/useWorkout";
  import WorkoutLogComponent from "@/components/Dashboard/WorkoutList/Workout.vue";
  import ExportDataButton from "@/components/Dashboard/ExportDataButton.vue";
  import SkeletonList from "@/components/Skeletons/List.vue";

  defineOptions({
    name: "WorkoutListComponent",
  });

  const { workouts: workoutsLogs } = useWorkout();
</script>

<template>
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
    <h1 class="text-2xl font-bold mb-4 mt-5 md:mt-0 md:mb-0">Mis Entrenamientos</h1>
    <ExportDataButton class="mx-auto ml-0 md:mr-0 block" />
  </div>

  <!-- Workout Logs -->
  <div class="flex flex-col gap-4">
    <WorkoutLogComponent v-for="log in workoutsLogs" :key="log.id" :workoutLog="log" />
  </div>
  <SkeletonList :items="6" item-height="300px" v-if="workoutsLogs.length === 0" />
</template>

<style lang="postcss"></style>
