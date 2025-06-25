<script lang="ts" setup>
  import { onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useRoutine } from "@/composables/useRoutine";

  const { routine, fetchRoutineById, loading } = useRoutine();
  const route = useRoute();

  onMounted(async () => {
    const id = route.params.id;
    if (id && typeof id === "string") {
      await fetchRoutineById(id);
    }
  });
</script>

<template>
  <div v-if="routine && !loading">
    <h1 class="text-xl md:text-2xl font-bold mb-2">Rutina: {{ routine.name }}</h1>
    <p class="mb-4">{{ routine.description }}</p>

    <ul class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="exercise in routine.routines_exercises"
        :key="exercise.id"
        class="bg-white dark:bg-slate-800 p-4 mb-2 rounded-md shadow"
      >
        <p class="mb-3 font-bold">{{ exercise.order }}. {{ exercise.exercise.name }}</p>
        <div class="flex items-center gap-4">
          <div>
            <img
              v-if="exercise.exercise.image"
              :src="exercise.exercise.image"
              alt="Exercise Image"
              class="w-28 h-28 rounded-md mb-2 border border-slate-200 dark:border-slate-700"
            />
          </div>
          <ul class="text-sm space-y-2">
            <li class="border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">
              Sets: <strong>{{ exercise.sets }}</strong>
            </li>
            <li v-if="exercise.measurement == 'reps'" class="border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">
              Repeticiones: <strong>{{ exercise.reps }}</strong>
            </li>
            <li v-if="exercise.measurement == 'time'" class="border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">
              Duracion: <strong>{{ exercise.duration_sec }} seg </strong>
            </li>
            <li class="border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">
              Descanso entre sets: <strong>{{ exercise.rest_seconds }} seg</strong>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped></style>
