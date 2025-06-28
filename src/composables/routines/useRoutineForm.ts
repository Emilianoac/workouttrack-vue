import { ref, reactive } from "vue";
import { useAuth } from "@/composables/auth/useAuth";
import { fetchRoutineById, createRoutine, updateRoutine } from "@/services/routine/routineService";
import { routineToEditable } from "@/services/routine/routineMappers";
import type { EditableRoutine, EditableRoutineExercise } from "@/types/routines";

function createEmptyExercise(): EditableRoutineExercise {
  return {
    exercise_id: null,
    order: null,
    measurement: null,
    sets: null,
    reps: null,
    duration_sec: null,
    rest_seconds: null,
    notes: null,
  };
}

export function useRoutineForm() {
  const { user } = useAuth();

  const isEditMode = ref(false);
  const routineId = ref<string | null>(null);

  const routine = reactive<EditableRoutine>({
    name: "",
    description: "",
    routines_exercises: [createEmptyExercise()],
  });

  async function loadRoutine(id: string) {
    const data = await fetchRoutineById(id, user.value!.id);
    if (data) {
      isEditMode.value = true;
      routineId.value = data.id;
      const editable = routineToEditable(data);
      Object.assign(routine, editable);
    }
  }

  async function saveRoutine() {
    if (!routine.name || !routine.routines_exercises.length) {
      alert("Completa todos los campos requeridos.");
      return;
    }

    try {
      if (isEditMode.value && routineId.value) {
        await updateRoutine(routineId.value, routine, user.value!.id);
      } else {
        await createRoutine(routine, user.value!.id);
      }
      alert("Rutina guardada.");
    } catch (e) {
      alert("Hubo un error al guardar.");
      console.error(e);
    }
  }

  function addExercise() {
    routine.routines_exercises.push(createEmptyExercise());
  }

  function removeExercise(index: number) {
    if (routine.routines_exercises.length <= 1) return; // No permitir eliminar si solo hay un ejercicio
    routine.routines_exercises.splice(index, 1);
  }

  return {
    routine,
    isEditMode,
    loadRoutine,
    saveRoutine,
    addExercise,
    removeExercise,
  };
}
