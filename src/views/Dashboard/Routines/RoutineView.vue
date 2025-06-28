<script lang="ts" setup>
  import { onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useRoutine } from "@/composables/routines/useRoutine";
  import EditIcon from "@/components/Icons/Edit.vue";
  import TrashIcon from "@/components/Icons/Trash.vue";

  const { routine, getRoutineById, loading, deleteRoutine } = useRoutine();
  const route = useRoute();
  const router = useRouter();

  async function handleDelete() {
    if (routine.value) {
      const confirmed = confirm("¿Estás seguro de que quieres eliminar esta rutina?");
      if (confirmed) {
        await deleteRoutine(routine.value.id);
        router.push({ name: "my-routines" });
      }
    }
  }

  onMounted(async () => {
    const id = route.params.id;
    if (id && typeof id === "string") {
      await getRoutineById(id);
    }
  });
</script>

<template>
  <div v-if="routine && !loading">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl md:text-2xl font-bold">Rutina: {{ routine.name }}</h1>
      <!-- Routine Actions -->
      <div class="flex items-center gap-2">
        <RouterLink
          :to="{ name: 'edit-routine', params: { id: routine.id } }"
          title="Editar rutina"
          class="app-btn font-semibold p-2 text-sm bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:hover:bg-slate-50 dark:text-blue-600 mx-auto mr-0 flex items-center"
        >
          <EditIcon class="w-5 h-5" />
        </RouterLink>
        <button
          @click="handleDelete"
          title="Eliminar rutina"
          class="app-btn font-semibold p-2 text-sm bg-red-600 text-white hover:bg-red-500 mx-auto mr-0 flex items-center"
        >
          <TrashIcon class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Routine Details -->
    <p class="mb-4">{{ routine.description }}</p>

    <!-- Routine Exercises -->
    <ul class="grid gap-4 grid-cols-1">
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
              class="w-28 h-28 rounded-md mb-2 border border-slate-100 dark:border-slate-700"
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
