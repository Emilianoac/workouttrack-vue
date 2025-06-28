import { ref, onMounted } from "vue";
import { useAuth } from "@/composables/auth/useAuth";
import { fetchRoutineById, fetchRoutines, deleteRoutineAPI } from "@/services/routine/routineService";
import type { Routine } from "@/types/routine";

export function useRoutine({ autoFetch = true } = {}) {
  const { user } = useAuth();
  const routines = ref<Routine[]>([]);
  const routine = ref<Routine | null>(null);
  const error = ref(false);
  const loading = ref(false);

  async function getRoutines(): Promise<Routine[] | []> {
    if (!user.value) return [];
    loading.value = true;

    try {
      routines.value = await fetchRoutines(user.value.id);
      routines.value.forEach((r) => {
        r.routines_exercises.sort((a, b) => a.order - b.order);
      });
      return routines.value;
    } catch (err) {
      error.value = true;
      console.error("Error loading routines", err);
      return [];
    } finally {
      loading.value = false;
    }
  }

  async function getRoutineById(routineId: string): Promise<Routine | null> {
    if (!user.value) return null;
    loading.value = true;

    try {
      routine.value = await fetchRoutineById(routineId, user.value.id);
      routine.value?.routines_exercises.sort((a, b) => a.order - b.order);
      return routine.value;
    } catch (err) {
      error.value = true;
      console.error("Error loading routine", err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function deleteRoutine(routineId: string) {
    if (!user.value) return;
    loading.value = true;
    try {
      await deleteRoutineAPI(routineId, user.value.id);
      routines.value = routines.value.filter((r) => r.id !== routineId);
      if (routine.value?.id === routineId) {
        routine.value = null;
      }
      console.log("Routine deleted successfully");
    } catch (err) {
      error.value = true;
      console.error("Error deleting routine", err);
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    if (autoFetch) {
      getRoutines();
    }
  });

  return {
    routines,
    routine,
    fetchRoutines,
    getRoutines,
    getRoutineById,
    deleteRoutine,
    error,
    loading,
  };
}
