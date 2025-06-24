<script lang="ts" setup>
  import { useAuth } from "@/composables/auth/useAuth";
  import SiteBrand from "@/components/Shared/SiteBrand.vue";
  import Dropdown from "@/components/Shared/Dropdown.vue";
  import ThemeToogle from "@/components/Shared/ThemeToggle.vue";

  const { signOut, user } = useAuth();

  async function handleSignOut() {
    await signOut();
    window.location.reload();
  }

  const dropdownItems = [
    { label: "Perfil", to: "/perfil", class: undefined },
    { label: "Cerrar sesión", action: handleSignOut, class: "text-red-500" },
  ];
</script>

<template>
  <header class="header">
    <router-link to="/" aria-label="Inicio">
      <SiteBrand class="w-48 h-auto" />
    </router-link>

    <div class="flex space-x-4" role="toolbar" aria-label="Opciones de usuario">
      <ThemeToogle class="w-8 h-8" />
      <Dropdown v-if="user" :items="dropdownItems" title="Acciones" />
    </div>
  </header>
</template>

<style lang="postcss" scoped>
  .header {
    @apply flex justify-between items-center;
    @apply bg-white dark:bg-slate-800;
    @apply px-4 py-3;
    @apply border-b border-gray-200 dark:border-slate-700;
  }
</style>
