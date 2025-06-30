import { ref, onMounted } from "vue";
import { fetchWorkouts, fetchDownloadableWorkouts } from "@/services/workout/workoutService";
import { useAuth } from "@/composables/auth/useAuth";
import type { WorkoutLog, WorkoutLogdownloadable } from "@/types/workoutLog";

export function useWorkout({ autoFetch = true } = {}) {
  const { user } = useAuth();
  const workouts = ref<WorkoutLog[]>([]);
  const error = ref(false);
  const loading = ref(false);

  async function getWorkouts(): Promise<WorkoutLog[] | []> {
    if (!user.value) return [];
    loading.value = true;

    try {
      workouts.value = await fetchWorkouts(user.value.id);
      return workouts.value;
    } catch (err) {
      error.value = true;
      console.error("Error loading workouts", err);
      workouts.value = [];
      return [];
    } finally {
      loading.value = false;
    }
  }

  async function getDownloadableWorkouts(): Promise<WorkoutLogdownloadable[]> {
    if (!user.value) return [];
    loading.value = true;

    try {
      const data = await fetchDownloadableWorkouts(user.value.id);

      data.forEach((workout) => {
        workout.workout_log_entries.forEach((entry) => {
          entry.set_logs.sort((a, b) => a.set_number - b.set_number);
        });
      });

      return data;
    } catch (err) {
      error.value = true;
      console.error("Error loading downloadable workouts", err);
      return [];
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    if (autoFetch) {
      getWorkouts();
    }
  });

  return {
    workouts,
    error,
    loading,
    getWorkouts,
    getDownloadableWorkouts,
  };
}
