import { supabase } from "@/lib/supabaseClient";
import type { Exercise } from "@/types/exercise";

export async function fetchExercises(): Promise<Exercise[]> {
  const { data, error } = await supabase
    .from("exercises")
    .select(
      `
      id,
      name,
      image
      `,
    )
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data as Exercise[];
}
