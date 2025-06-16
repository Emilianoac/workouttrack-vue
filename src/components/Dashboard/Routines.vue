<script lang="ts" setup>
  import { useRoutine } from "@/composables/useRoutine";

  defineOptions({
    name: "RoutinesComponent",
  });

  const { routines } = useRoutine();
</script>

<template>
  <div class="flex gap-4">
    <div
      v-for="routine in routines"
      :key="routine.id"
      class="bg-white dark:bg-slate-800 shadow-md rounded-lg p-3 w-1/3"
    >
      <!--Routine Name-->
      <h2 class="text-xl font-bold">{{ routine.name }}</h2>
      <!--Routine Description-->
      <p class="mb-4 opacity-85">{{ routine.description }}</p>
      <ul>
        <li
          v-for="data in routine.routines_exercises"
          :key="data.id"
          class="mb-4 border-b border-gray-200 dark:border-gray-700 pb-4 last-of-type:border-0 last-of-type:pb-0"
        >
          <p class="mb-2">
            <strong>{{ data.exercise.name }}</strong> - {{ data.sets }} sets de
            {{ data.measurement === "reps" ? `${data.reps} repeticiones` : `${data.duration_sec} segundos` }}
          </p>
          <img
            v-if="data.exercise.image"
            :src="data.exercise.image"
            alt="Exercise image"
            class="w-[80px] h-auto block rounded-md"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
