<script lang="ts" setup>
  import { computed } from "vue";
  import { useRouter } from "vue-router";

  defineOptions({
    name: "SidebarComponent",
  });

  const router = useRouter();
  const menuItems = router
    .getRoutes()
    .filter((route) => {
      return route.meta.menu === true;
    })
    .sort((a, b) => {
      return (Number(a.meta.order) || 0) - (Number(b.meta.order) || 0);
    });

  const menuItemsColumns = computed(() => {
    const count = menuItems.length;
    return `repeat(${count},1fr)`;
  });
</script>

<template>
  <nav
    class="bg-white dark:bg-slate-800 fixed bottom-0 left-0 w-full py-2 border-t border-gray-200 dark:border-slate-700 z-50"
  >
    <ul :style="{ gridTemplateColumns: menuItemsColumns }" class="grid justify-between items-center">
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
