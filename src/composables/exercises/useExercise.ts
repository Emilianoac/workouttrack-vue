import { ref } from "vue";
import { fetchExercises } from "@/services/exercise/exerciseService";
import type { Exercise } from "@/types/exercise";

export function useExercise() {
  const exercises = ref<Exercise[]>([]);
  const error = ref(false);
  const loading = ref(false);

  async function getExercices(): Promise<Exercise[] | []> {
    loading.value = true;

    try {
      exercises.value = await fetchExercises();
      return exercises.value;
    } catch (err) {
      error.value = true;
      console.error("Error loading exercises", err);
      return [];
    } finally {
      loading.value = false;
    }
  }

  return {
    exercises,
    getExercices,
    error,
    loading,
  };
}
