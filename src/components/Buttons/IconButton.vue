<script setup lang="ts">
  defineProps<{
    ariaLabel?: string;
    onClick?: () => void;
  }>();
</script>

<template>
  <button
    :aria-label="ariaLabel"
    @click="onClick"
    class="w-[30px] h-[30px] bg-gray-200 dark:bg-slate-700 rounded-full p-1 hover:bg-gray-300 dark:hover:bg-slate-600 flex items-center justify-center"
  >
    <slot />
  </button>
</template>
