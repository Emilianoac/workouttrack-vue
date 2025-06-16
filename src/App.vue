<script setup lang="ts">
  import { useDark } from "@vueuse/core";
  import Toploader from "@/components/Shared/TopLoader.vue";

  useDark();
</script>

<template>
  <Toploader />
  <RouterView />
</template>

<style scoped></style>
