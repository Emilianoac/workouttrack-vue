<script lang="ts" setup>
  import { computed } from "vue";
  defineOptions({
    name: "AlertComponent",
  });

  const props = defineProps<{
    type?: "success" | "error" | "info" | "warning";
    message: string;
  }>();

  const alertClasses = computed(() => {
    switch (props.type) {
      case "success":
        return "bg-green-100 text-green-800 border-green-400";
      case "error":
        return "bg-red-100 text-red-800 border-red-400";
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-400";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 border-gray-400";
    }
  });
</script>

<template>
  <div class="p-2 rounded-md border" :class="alertClasses" role="alert">
    <span class="font-medium">{{ message }}</span>
  </div>
</template>

<style lang="postcss" scoped></style>
