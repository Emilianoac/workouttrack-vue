<script lang="ts" setup>
  import { useDark, useToggle } from "@vueuse/core";
  import SiteBrand from "@/components/SiteBrand.vue";

  const isDark = useDark();
  const toggle = useToggle(isDark);
</script>

<template>
  <header class="header">
    <router-link to="/" class="text-xl font-bold text-blue-500" aria-label="Inicio">
      <SiteBrand class="w-40 h-auto" />
    </router-link>

    <div class="flex space-x-4" role="toolbar" aria-label="Opciones de usuario">
      <button @click="toggle()">Cambiar tema</button>
      <!-- Dropdown usuario aquí -->
    </div>
  </header>
</template>

<style lang="postcss" scoped>
  .header {
    @apply bg-white dark:bg-slate-800 px-2 py-3 flex justify-between items-center border-b border-gray-200 dark:border-slate-700;
  }
</style>
