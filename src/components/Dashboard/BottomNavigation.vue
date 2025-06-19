<script lang="ts" setup>
  import { useRouter } from "vue-router";

  defineOptions({
    name: "SidebarComponent",
  });

  const router = useRouter();
  const menuItems = router.getRoutes().filter((route) => {
    return route.meta.menu === true;
  });
</script>

<template>
  <nav
    class="bg-white dark:bg-slate-800 fixed bottom-0 left-0 w-full py-2 border-t border-gray-200 dark:border-slate-700 z-50"
  >
    <ul class="grid grid-cols-3 justify-between items-center">
      <li v-for="item in menuItems" :key="item.path">
        <router-link
          :to="{ name: item.name }"
          exact-active-class="active-item"
          class="flex flex-col items-center justify-center text-gray-800 dark:text-white"
        >
          <component v-if="item.meta.icon" :is="item.meta.icon" class="shrink-0" />
          <span class="text-[0.74em] shrink-0 opacity-70">{{ item.meta?.shortLabel }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="postcss" scoped>
  .active-item {
    svg {
      @apply text-blue-500;
    }
  }
</style>
