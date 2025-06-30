import type { Exercise } from "@/types/exercise";

export interface WorkoutLog {
  id: string;
  created_at: string;
  notes: string | null;
  body_weight_kg: number;
  routine: Routine;
  workout_log_entries: WorkoutLogEntry[];
}

export interface WorkoutLogEntry {
  id: string;
  target_reps: number | null;
  target_duration_sec: number | null;
  target_rest_between_sets_sec: number | null;
  target_sets: number;
  reps: number | null;
  duration_sec: number | null;
  rest_between_sets_sec: number | null;
  weight: string | null;
  rest_sec: number | null;
  exercise: Exercise;
  set_logs: SetLog[];
}

export interface Routine {
  id: string;
  name: string;
}

export interface SetLog {
  id: string;
  workout_log_entry_id: string;
  set_number: number;
  reps: number | null;
  weight_kg: number | null;
  duration_sec: number | null;
  rest_between_sets_sec: number | null;
  is_body_weight: boolean;
  notes: string | null;
}

export type NewSetLog = Omit<SetLog, "id">;

export type WorkoutLogdownloadable = Omit<WorkoutLog, "routine" | "workout_log_entries"> & {
  routine: Pick<Routine, "name">;
  workout_log_entries: Array<
    Omit<WorkoutLogEntry, "exercise" | "set_logs"> & {
      exercise: Pick<Exercise, "name">;
      set_logs: Array<Omit<SetLog, "id">>;
    }
  >;
};
