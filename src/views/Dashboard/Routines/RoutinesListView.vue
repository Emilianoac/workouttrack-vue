<script lang="ts" setup>
  import RoutinesList from "@/components/Dashboard/Routines/List.vue";
</script>

<template>
  <section>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold mb-4">Mis Rutinas</h1>
      <RouterLink
        :to="{ name: 'create-routine' }"
        class="app-btn app-btn-primary font-semibold text-sm flex items-center gap-2"
      >
        Añadir rutina
      </RouterLink>
    </div>
    <RoutinesList />
  </section>
</template>

<style lang="postcss" scoped></style>
