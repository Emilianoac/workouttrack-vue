<script lang="ts" setup>
  import RoutinesList from "@/components/Dashboard/Routines/List.vue";
</script>

<template>
  <section>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold mb-4">Mis Rutinas</h1>
      <RouterLink
        :to="{ name: 'create-routine' }"
        class="app-btn font-semibold text-sm bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:hover:bg-slate-50 dark:text-blue-600 mb-4"
        >Añadir rutina</RouterLink
      >
    </div>
    <RoutinesList />
  </section>
</template>

<style lang="postcss" scoped></style>
