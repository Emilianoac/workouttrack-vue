<script lang="ts" setup>
  import { reactive, useTemplateRef, watch } from "vue";
  import { useDark } from "@vueuse/core";
  import es from "apexcharts/dist/locales/es.json";
  import ApexCharts from "vue3-apexcharts";
  import Sekeleton from "@/components/Skeletons/Skeleton.vue";
  import type { ApexOptions } from "apexcharts";

  const props = defineProps<{
    chartId: string;
    chartName: string;
    chartData: number[][];
    isLoading: boolean;
    error: {
      isError: boolean;
      message: string;
    };
  }>();

  const isDark = useDark();
  const chart = useTemplateRef<ApexCharts>("chart");

  const chartOptions = reactive<ApexOptions>({
    chart: {
      id: props.chartId,
      locales: [es],
      defaultLocale: "es",
      toolbar: { show: false },
      zoom: { enabled: false },
      background: "transparent",
    },
    xaxis: {
      type: "datetime",
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "10px",
      },
      textAnchor: "end",
      formatter: (val: number) => {
        return `${val.toFixed(1)} kg`;
      },
    },
    stroke: { curve: "smooth", width: 3 },
    theme: {
      mode: isDark.value ? "dark" : "light",
      monochrome: { enabled: true, shadeTo: "dark", shadeIntensity: 0.94 },
    },
  });

  const series = reactive({
    name: props.chartName,
    data: props.chartData || [],
  });

  watch(isDark, (value, oldValue) => {
    if (value !== oldValue) {
      chart.value?.updateOptions({ theme: { mode: value ? "dark" : "light" } });
    }
  });

  watch(
    () => props.chartData,
    (newData) => {
      series.data = newData;
    },
    { immediate: true },
  );
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-lg shadow-md mb-5 border border-gray-200 dark:border-slate-700 p-4">
    <Sekeleton width="100%" height="200px" v-if="isLoading" />
    <p v-else-if="error.isError" class="text-red-500 text-center p-8">{{ error.message }}</p>
    <ApexCharts v-else ref="chart" width="100%" height="200" type="area" :series="[series]" :options="chartOptions" />
  </div>
</template>

<style lang="postcss" scoped></style>
