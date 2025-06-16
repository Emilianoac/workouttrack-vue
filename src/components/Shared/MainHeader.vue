<script lang="ts" setup>
  import { useAuth } from "@/composables/useAuth";
  import { useDark, useToggle } from "@vueuse/core";
  import { useRouter } from "vue-router";
  import SiteBrand from "@/components/Shared/SiteBrand.vue";
  const isDark = useDark();
  const toggle = useToggle(isDark);
  const { signOut, user } = useAuth();

  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push({ name: "login" });
  }
</script>

<template>
  <header class="header">
    <router-link to="/" aria-label="Inicio">
      <SiteBrand class="w-48 h-auto" />
    </router-link>

    <div class="flex space-x-4" role="toolbar" aria-label="Opciones de usuario">
      <button @click="toggle()">Cambiar tema</button>

      <!-- 👇 Mostrar solo si el usuario está logueado -->
      <div v-if="user" class="relative">
        <button class="rounded bg-slate-200 dark:bg-slate-700 px-3 py-1">
          {{ user.email }}
        </button>
        <!-- Aquí podrías agregar un dropdown -->
        <div class="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded shadow">
          <button
            @click="handleSignOut"
            class="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <!-- Si no está logueado, puedes mostrar botones de login/register -->
      <div v-else>
        <router-link to="/login" class="text-sm">Iniciar sesión</router-link>
      </div>
    </div>
  </header>
</template>

<style lang="postcss" scoped>
  .header {
    @apply bg-white dark:bg-slate-800 px-2 py-3 flex justify-between items-center border-b border-gray-200 dark:border-slate-700;
  }
</style>
