import { supabase } from "@/lib/supabaseClient";
import type { WorkoutLog, WorkoutLogdownloadable, WorkoutLogEntry, NewSetLog } from "@/types/workoutLog";

export interface WorkoutLogEntryPayload {
  workout_log_id: string;
  exercise_id: string;
  order: number;
  target_sets: number;
  target_reps: number | null;
  target_duration_sec: number | null;
  target_rest_between_sets_sec: number | null;
}

interface CreateWorkoutLogMetadataParams {
  routineId: string;
  workoutDate: string;
  bodyWeight: number;
  userId: string;
}

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

export async function createWorkoutLogMetadata({
  routineId,
  workoutDate,
  bodyWeight,
  userId,
}: CreateWorkoutLogMetadataParams) {
  const { data, error } = await supabase
    .from("workout_logs")
    .insert({
      routine_id: routineId,
      created_at: workoutDate,
      body_weight_kg: bodyWeight,
      user_id: userId,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data as unknown as WorkoutLog;
}

export async function createWorkoutLogEntry(payload: WorkoutLogEntryPayload[]) {
  const { data, error } = await supabase.from("workout_log_entries").insert(payload).select();

  if (error) throw new Error(error.message);
  return data as unknown as WorkoutLogEntry[];
}

export async function createWorkoutSetLogs(payload: NewSetLog[]) {
  const { error } = await supabase.from("set_logs").insert(payload);
  if (error) throw new Error(error.message);
}
