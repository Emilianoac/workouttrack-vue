<script lang="ts" setup>
  defineOptions({
    name: "ChevronLeftIcon",
  });
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="none"
      stroke="currentColor"
      stroke-dasharray="12"
      stroke-dashoffset="12"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M8 12l7 -7M8 12l7 7"
    >
      <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="12;0" />
    </path>
  </svg>
</template>

<style lang="postcss" scoped></style>
