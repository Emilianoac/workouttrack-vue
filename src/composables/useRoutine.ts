import { ref, onMounted } from "vue";
import { supabase } from "@/lib/supabaseClient";
import type { Routine } from "@/types/routines";
import { useAuth } from "@/composables/auth/useAuth";

export function useRoutine() {
  const routines = ref<Routine[]>([]);
  const { user } = useAuth();

  async function fetchRoutines() {
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
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching routines:", error.message);
      }
    }
  }

  onMounted(() => {
    fetchRoutines();
  });

  return {
    routines,
    fetchRoutines,
  };
}
