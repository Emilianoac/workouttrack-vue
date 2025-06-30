<script setup lang="ts">
  import { computed } from "vue";
  import { useWorkoutChartData } from "@/composables/workouts/useWorkoutChartData";
  import RoutinesList from "@/components/Dashboard/Routines/List.vue";
  import AreaChart from "@/components/Charts/AreaChart.vue";
  import RegisterWorkoutIcon from "@/components/Icons/RegisterWorkout.vue";

  const { weight } = useWorkoutChartData();

  const currentWeight = computed(() => {
    return weight.data.length > 0 ? weight.data[weight.data.length - 1][1] : "N/A";
  });
</script>

<template>
  <!-- Welcome Section -->
  <section class="flex justify-between items-center mb-4">
    <h1 class="text-3xl font-bold">Bienvenido</h1>
    <RouterLink
      :to="{ name: 'register-workout' }"
      class="app-btn app-btn-primary font-semibold text-sm hidden md:flex items-center gap-2"
    >
      Registar entrenamiento <RegisterWorkoutIcon />
    </RouterLink>
  </section>

  <!-- Body Weight Chart -->
  <section>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold">Historial de Peso</h2>
      <p class="text-sm text-gray-600 dark:text-gray-400">Peso actual: {{ currentWeight }} kg</p>
    </div>
    <AreaChart
      :is-loading="weight.loading"
      :error="weight.error"
      chart-id="weight-chart"
      chart-name="Peso"
      :chart-data="weight.data"
    />
  </section>

  <!-- Routines Section -->
  <h2 class="text-xl font-bold mb-3">Mis Rutinas</h2>
  <RoutinesList />
</template>
