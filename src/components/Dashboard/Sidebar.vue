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
  <aside class="sidebar">
    <div class="sidebar-container">
      <ul class="sidebar-menu w-full">
        <li v-for="item in menuItems" :key="item.path" class="sidebar-menu__item">
          <router-link :to="{ name: item.name }" exact-active-class="active-item">
            <component v-if="item.meta.icon" :is="item.meta.icon" class="menu-item__icon" />
            <span class="menu-item__label">{{ item.meta.label }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style lang="postcss">
  .sidebar {
    @apply bg-white dark:bg-slate-800 h-full relative;
  }

  .sidebar-container {
    @apply bg-white dark:bg-slate-800;
    @apply w-full h-screen overflow-x-hidden pt-4;
    @apply absolute top-0 left-0 right-0 z-[1000];
    @apply transition-all duration-300 ease-in-out;
    @apply border-r border-gray-200 dark:border-slate-700;

    .sidebar-menu__item {
      @apply flex justify-start mb-3 px-2;

      a {
        @apply flex justify-start gap-2 p-1 items-center text-gray-800 dark:text-white;
        @apply w-full;

        &:hover {
          @apply bg-slate-100 dark:bg-slate-700 rounded-md;
        }
      }

      .active-item {
        @apply bg-slate-100 dark:bg-slate-700 rounded-md;

        .menu-item__icon {
          @apply text-blue-500;
        }
      }

      .menu-item__icon {
        @apply w-6 h-6 shrink-0;
      }

      .menu-item__label {
        @apply text-sm font-medium;
        @apply whitespace-nowrap;
      }
    }
  }
</style>
