<script lang="ts" setup>
  import { useWorkout } from "@/composables/workouts/useWorkout";
  import DownloadIcon from "@/components/Icons/Download.vue";

  const { getDownloadableWorkouts } = useWorkout();

  async function handleWorkoutsDowndload() {
    try {
      const data = await getDownloadableWorkouts();

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "workouts_logs.json";
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.error("Unknown error occurred while downloading workouts.", error);
      }
      return;
    }
  }
</script>

<template>
  <button
    @click="handleWorkoutsDowndload"
    type="button"
    class="app-btn app-btn-primary font-semibold text-sm flex items-center gap-2"
  >
    Descargar datos <DownloadIcon class="w-5 h-5" />
  </button>
</template>

<style lang="postcss" scoped></style>
