<script lang="ts" setup>
  import { useDark, useToggle } from "@vueuse/core";
  import IconMoon from "@/components/Icons/Moon.vue";
  import IconSun from "@/components/Icons/Sun.vue";
  import IconButton from "@/components/Buttons/IconButton.vue";

  const isDark = useDark();
  const toggle = useToggle(isDark);
</script>

<template>
  <IconButton @click="toggle()" aria-label="Cambiar tema">
    <IconSun v-if="isDark" />
    <IconMoon v-else />
  </IconButton>
</template>

<style lang="postcss" scoped></style>
