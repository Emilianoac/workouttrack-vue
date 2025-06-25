<script lang="ts" setup>
  import { type Routine } from "@/types/routines";

  defineOptions({
    name: "RoutinesCard",
  });

  defineProps<{
    routine: Routine;
  }>();
</script>

<template>
  <article
    class="bg-white dark:bg-slate-800 shadow-md rounded-lg p-3 w-full hover:opacity-90 transition-opacity duration-300 hover:shadow-lg"
  >
    <RouterLink :to="`/dashboard/routines/${routine.id}`" class="block">
      <!--Routine Name-->
      <h2 class="font-bold">{{ routine.name }}</h2>
      <!--Routine Description-->
      <p class="mb-4 opacity-70 text-sm">{{ routine.description }}</p>
      <ul class="grid grid-cols-5 gap-3">
        <li v-for="data in routine.routines_exercises" :key="data.id">
          <img
            v-if="data.exercise.image"
            :src="data.exercise.image"
            alt="Exercise image"
            class="w-fit h-auto block rounded-md"
          />
        </li>
      </ul>
    </RouterLink>
  </article>
</template>

<style lang="postcss" scoped></style>
