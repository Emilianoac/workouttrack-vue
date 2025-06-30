import { supabase } from "@/lib/supabaseClient";
import type { WorkoutLog, WorkoutLogdownloadable } from "@/types/workoutLog";

async function fetchWorkoutsBase(selectFields: string, user_id: string): Promise<WorkoutLog[]> {
  const { data, error } = await supabase
    .from("workout_logs")
    .select(selectFields)
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as unknown as WorkoutLog[];
}

export async function fetchWorkouts(userId: string): Promise<WorkoutLog[]> {
  return fetchWorkoutsBase(
    `
    id,
    created_at,
    body_weight_kg,
    notes,
    routine:routine_id (
      name
    ),
    workout_log_entries (
      target_sets,
      target_reps,
      target_duration_sec,
      target_rest_between_sets_sec,
      exercise:exercise_id (
        id,
        name
      ),
      set_logs (
        set_number,
        reps,
        weight_kg,
        is_body_weight,
        rest_between_sets_sec,
        notes
      )
    )
  `,
    userId,
  );
}

export async function fetchDownloadableWorkouts(userId: string): Promise<WorkoutLogdownloadable[]> {
  return fetchWorkoutsBase(
    `
    created_at,
    body_weight_kg,
    routine:routine_id (
      name
    ),
    workout_log_entries (
      target_sets,
      target_reps,
      target_duration_sec,
      target_rest_between_sets_sec,
      exercise:exercise_id (
        name
      ),
      set_logs (
        set_number,
        reps,
        duration_sec,
        weight_kg,
        is_body_weight,
        rest_between_sets_sec,
        notes
      )
    )
  `,
    userId,
  );
}
