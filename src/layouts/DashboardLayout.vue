<script lang="ts" setup>
  import Sidebar from "@/components/Dashboard/Sidebar.vue";
  import MainHeader from "@/components/Shared/MainHeader.vue";
  import BottomNavigation from "@/components/Dashboard/BottomNavigation.vue";
</script>

<template>
  <div class="block lg:grid lg:grid-cols-[230px_1fr] grid-rows-[auto_1fr] md:overflow-hidden h-screen">
    <MainHeader class="col-span-2" />
    <Sidebar class="hidden lg:block" />
    <main class="p-7 overflow-auto pb-20 lg:pb-7">
      <router-view />
    </main>
  </div>
  <BottomNavigation class="lg:hidden" />
</template>

<style lang="postcss"></style>
