import { ref, onMounted } from "vue";
import { supabase } from "@/lib/supabaseClient";
import type { Routine } from "@/types/routines";

export function useRoutine() {
  const routines = ref<Routine[]>([]);

  async function fetchRoutines() {
    try {
      const { data, error } = await supabase.from("routines").select(`
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
      `);

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
  };
}
