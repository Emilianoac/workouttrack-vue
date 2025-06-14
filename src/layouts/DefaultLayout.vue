<script lang="ts" setup>
  import MainSidebar from "@/components/MainSidebar.vue";
  import MainHeader from "@/components/MainHeader.vue";
</script>

<template>
  <div class="grid grid-cols-[50px_1fr] grid-rows-[auto_1fr] overflow-hidden h-screen">
    <MainHeader class="col-span-2" />
    <MainSidebar />
    <main class="px-20 py-10 overflow-auto">
      <slot />
    </main>
  </div>
</template>

<style lang="postcss"></style>
