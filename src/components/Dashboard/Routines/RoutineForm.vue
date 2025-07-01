<script setup lang="ts">
  import { onMounted } from "vue";
  import { useRoutineForm } from "@/composables/routines/useRoutineForm";
  import { useExercise } from "@/composables/exercises/useExercise";
  import TrashIcon from "@/components/Icons/Trash.vue";

  const props = defineProps<{
    routineId?: string;
  }>();

  const { exercises } = useExercise();
  const { routine, isEditMode, loadRoutine, saveRoutine, addExercise, removeExercise } = useRoutineForm();

  if (props.routineId) {
    isEditMode.value = true;
    onMounted(() => loadRoutine(props.routineId!));
  }
</script>

<template>
  <form @submit.prevent="saveRoutine">
    <h1 class="text-2xl font-bold mb-6">
      {{ isEditMode ? "Editar Rutina" : "Crear Nueva Rutina" }}
    </h1>

    <!-- Routine Details -->
    <div class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow mb-6">
      <!-- Name -->
      <div class="mb-4">
        <label for="name" class="form-label">Nombre de la rutina</label>
        <input v-model="routine.name" class="form-input" type="text" id="name" />
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="form-label">Descripción</label>
        <textarea v-model="routine.description" id="description" rows="3" class="form-input"></textarea>
      </div>
    </div>

    <!-- Exercises -->
    <h3 class="text-xl font-bold mb-5">Ejercicios en la rutina</h3>
    <article>
      <div
        v-for="(exercise, i) in routine.routines_exercises"
        :key="i"
        class="mb-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow"
      >
        <div class="flex justify-between items-center mb-4">
          <h4 class="text-lg font-semibold">Ejercicio {{ i + 1 }}</h4>

          <button
            @click="removeExercise(i)"
            title="Eliminar ejercicio"
            type="button"
            class="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition-colors"
          >
            <TrashIcon class="w-4 h-4" />
          </button>
        </div>

        <div>
          <label :for="`exercise-${i}`" class="form-label">Ejercicio</label>
          <select v-model="exercise.exercise_id" class="form-input mb-4 mt-1" :id="`exercise-${i}`" required>
            <option :value="null" disabled>Selecciona un ejercicio</option>
            <option v-for="ex in exercises" :key="ex.id" :value="ex.id">
              {{ ex.name }}
            </option>
          </select>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <!-- Order -->
          <div>
            <label :for="`order-${i}`" class="form-label">Orden</label>
            <input v-model.number="exercise.order" type="number" :id="`order-${i}`" class="form-input" min="1" />
          </div>

          <!-- Measurement -->
          <div>
            <label :for="`measurement-${i}`" class="form-label">Forma de medición</label>
            <select v-model="exercise.measurement" :id="`measurement-${i}`" class="form-input" required>
              <option :value="null" disabled>Selecciona una medida</option>
              <option value="reps">Repeticiones</option>
              <option value="time">Segundos</option>
            </select>
          </div>

          <!-- Sets -->
          <div>
            <label :for="`sets-${i}`" class="form-label">Sets</label>
            <input v-model.number="exercise.sets" type="number" :id="`sets-${i}`" class="form-input" min="1" />
          </div>

          <!-- Reps -->
          <div>
            <label :for="`reps-${i}`" class="form-label">Repeticiones</label>
            <input v-model.number="exercise.reps" type="number" :id="`reps-${i}`" class="form-input" min="1" />
          </div>

          <!-- Duration -->
          <div>
            <label :for="`duration-${i}`" class="form-label">Duración (segundos)</label>
            <input
              v-model.number="exercise.duration_sec"
              type="number"
              :id="`duration-${i}`"
              class="form-input"
              min="0"
            />
          </div>

          <!-- Rest -->
          <div>
            <label :for="`rest-${i}`" class="form-label">Descanso (segundos)</label>
            <input v-model.number="exercise.rest_seconds" type="number" :id="`rest-${i}`" class="form-input" min="0" />
          </div>

          <!-- Notes -->
          <div class="col-span-1 md:col-span-3">
            <label :for="`notes-${i}`" class="form-label">Notas</label>
            <textarea v-model="exercise.notes" :id="`notes-${i}`" rows="2" class="form-input"></textarea>
          </div>
        </div>
      </div>
    </article>

    <!-- Add Exercise Button -->
    <div class="flex justify-end items-center mb-7">
      <button
        type="button"
        @click="addExercise"
        class="app-btn text-sm bg-black text-white rounded-md hover:bg-slate-800 dark:bg-slate-200 dark:text-black dark:hover:bg-slate-300"
      >
        Añadir Ejercicio
      </button>
    </div>

    <!-- Buttons -->
    <div class="flex justify-end items-center mb-4 gap-4">
      <RouterLink
        :to="{ name: 'my-routines' }"
        class="app-btn bg-gray-300 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
      >
        Cancelar
      </RouterLink>
      <button
        type="submit"
        class="app-btn bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Guardar Cambios
      </button>
    </div>
  </form>
</template>

<style lang="postcss" scoped></style>
