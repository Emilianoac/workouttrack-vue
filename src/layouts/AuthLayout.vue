<script lang="ts" setup>
  import { onMounted, useTemplateRef } from "vue";
  import workoutVideo from "@/assets/videos/workout-video.mp4";

  const videoRef = useTemplateRef("video");

  onMounted(() => {
    if (videoRef.value) videoRef.value.playbackRate = 0.5;
  });
</script>

<template>
  <div class="h-screen">
    <div class="relative">
      <video ref="video" autoplay loop muted class="w-full h-screen object-cover backdrop-blur-md" play>
        <source :src="workoutVideo" type="video/mp4" />
      </video>
      <div
        class="absolute top-0 left-0 z-10 backdrop-blur-xl bg-gradient-to-br from-gray-900 to-transparent dark:from-slate-800 dark:to-transparent w-full h-full flex items-center justify-center"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="postcss"></style>
