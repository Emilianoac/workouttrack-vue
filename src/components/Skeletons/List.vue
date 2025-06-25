<script lang="ts" setup>
  import Skeleton from "@/components/Skeletons/Skeleton.vue";

  defineOptions({
    name: "ListSkeleton",
  });

  const { items = 5, itemHeight = "h-16" } = defineProps<{
    items?: number;
    itemHeight?: string;
  }>();
</script>

<template>
  <Skeleton v-for="i in items" :key="i" class="w-full mb-4 last:mb-0" :style="{ height: itemHeight }" />
</template>

<style lang="postcss" scoped></style>
