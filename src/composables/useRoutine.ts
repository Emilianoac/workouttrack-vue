import { ref, onMounted } from "vue";
import { supabase } from "@/lib/supabaseClient";
import type { Routine } from "@/types/routines";
import { useAuth } from "@/composables/auth/useAuth";

export function useRoutine() {
  const { user } = useAuth();
  const routines = ref<Routine[]>([]);
  const routine = ref<Routine | null>(null);
  const error = ref(false);
  const loading = ref(false);

  async function fetchRoutines() {
    loading.value = true;
    try {
      if (!user.value) {
        console.warn("No user logged in");
        routines.value = [];
        return;
      }

      const { data, error } = await supabase
        .from("routines")
        .select(
          `
          id,
          name,
          description,
          routines_exercises (
            id,
            order,
            sets,
            reps,
            duration_sec,
            rest_seconds,
            measurement,
            exercise:exercises_id (
              id,
              name,
              image
            )
          )
        `,
        )
        .order("created_at", { ascending: true })
        .eq("user_id", user.value.id);

      if (error) throw new Error(error.message);

      routines.value = data as unknown as Routine[];
    } catch (err) {
      error.value = true;
      if (err instanceof Error) {
        console.error("Error fetching routines:", err.message);
      }
    } finally {
      loading.value = false;
    }
  }

  async function fetchRoutineById(id: string) {
    routine.value = null;
    if (!id) {
      console.warn("No routine ID provided");
      return null;
    }
    loading.value = true;

    try {
      if (!user.value) {
        console.warn("No user logged in");
        return null;
      }

      const { data, error } = await supabase
        .from("routines")
        .select(
          `
          id,
          name,
          description,
          routines_exercises (
            id,
            order,
            sets,
            reps,
            duration_sec,
            rest_seconds,
            measurement,
            exercise:exercises_id (
              id,
              name,
              image
            )
          )
        `,
        )
        .eq("id", id)
        .single();

      if (error) throw new Error(error.message);

      data.routines_exercises.sort((a: { order: number }, b: { order: number }) => a.order - b.order);

      routine.value = data as unknown as Routine;
    } catch (err) {
      error.value = true;
      if (err instanceof Error) {
        console.error("Error fetching routine by ID:", err.message);
      }
      return null;
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    fetchRoutines();
  });

  return {
    routines,
    routine,
    fetchRoutines,
    fetchRoutineById,
    error,
    loading,
  };
}
