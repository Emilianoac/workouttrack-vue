<script lang="ts" setup>
  import Sidebar from "@/components/Dashboard/Sidebar.vue";
  import MainHeader from "@/components/Shared/MainHeader.vue";
</script>

<template>
  <div class="grid grid-cols-[50px_1fr] grid-rows-[auto_1fr] overflow-hidden h-screen">
    <MainHeader class="col-span-2" />
    <Sidebar />
    <main class="px-20 py-10 overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<style lang="postcss"></style>
