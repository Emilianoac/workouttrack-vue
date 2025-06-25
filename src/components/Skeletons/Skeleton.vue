<script lang="ts" setup>
  defineOptions({
    name: "SkeletonComponent",
  });

  defineProps<{
    width?: string;
    height?: string;
  }>();
</script>

<template>
  <div :style="{ width, height }" class="skeleton"></div>
</template>

<style lang="postcss" scoped>
  .skeleton {
    @apply w-full h-4;
    @apply animate-pulse bg-gray-200 dark:bg-slate-700 rounded-md;
  }
</style>
