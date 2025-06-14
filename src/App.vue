<script setup lang="ts">
  import DefaultLayout from "@/layouts/DefaultLayout.vue";
  import Toploader from "@/components/TopLoader.vue";
</script>

<template>
  <Toploader />
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>

<style scoped></style>
