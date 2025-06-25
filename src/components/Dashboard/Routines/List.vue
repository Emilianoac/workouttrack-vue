<script lang="ts" setup>
  import { useRoutine } from "@/composables/useRoutine";
  import RoutinesCard from "@/components/Dashboard/Routines/Card.vue";

  defineOptions({
    name: "RoutinesList",
  });

  const { routines } = useRoutine();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    <RoutinesCard v-for="routine in routines" :key="routine.id" :routine="routine" />
  </div>
</template>

<style lang="postcss" scoped></style>
