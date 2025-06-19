<script lang="ts" setup>
  import Sidebar from "@/components/Dashboard/Sidebar.vue";
  import MainHeader from "@/components/Shared/MainHeader.vue";
  import BottomNavigation from "@/components/Dashboard/BottomNavigation.vue";
</script>

<template>
  <div class="block md:grid md:grid-cols-[230px_1fr] grid-rows-[auto_1fr] md:overflow-hidden h-screen">
    <MainHeader class="col-span-2" />
    <Sidebar class="hidden md:block" />
    <main class="px-5 md:px-20 py-10 overflow-auto">
      <router-view />
    </main>
  </div>
  <BottomNavigation class="md:hidden" />
</template>

<style lang="postcss"></style>
