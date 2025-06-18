<script setup lang="ts">
  import { computed } from "vue";
  import { useDataForCharts } from "@/composables/useDataForCharts";
  import RoutinesComponent from "@/components/Dashboard/Routines.vue";
  import AreaChart from "@/components/Charts/AreaChart.vue";

  const { weight } = useDataForCharts();

  const currentWeight = computed(() => {
    return weight.data.length > 0 ? weight.data[weight.data.length - 1][1] : "N/A";
  });
</script>

<template>
  <!-- Welcome Section -->
  <section class="mb-6">
    <h1 class="text-3xl font-bold mb-4">Bienvenido</h1>
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
  <RoutinesComponent />
</template>
