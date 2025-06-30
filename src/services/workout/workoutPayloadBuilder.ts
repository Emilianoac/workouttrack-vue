import type { WorkoutLogEntry, NewSetLog } from "@/types/workoutLog";
import type { RoutineExercise } from "@/types/routine";

interface ExerciseFormData {
  exerciseId: string;
  exerciseTargetData: RoutineExercise | null;
  sets_logs: NewSetLog[];
}

export function buildWorkoutLogPayload(exercises: ExerciseFormData[], workoutLogId: string) {
  return exercises.map((ej, index) => {
    const exData = ej.exerciseTargetData ? JSON.parse(JSON.stringify(ej.exerciseTargetData)) : null;

    return {
      workout_log_id: workoutLogId,
      order: index + 1,
      exercise_id: exData?.exercise?.id || ej.exerciseId,
      target_sets: exData?.sets || 0,
      target_reps: exData?.reps || null,
      target_duration_sec: exData?.duration_sec || null,
      target_rest_between_sets_sec: exData?.rest_seconds || null,
    };
  });
}

export function buildSetLogsPayload(entries: WorkoutLogEntry[], exercises: ExerciseFormData[]): NewSetLog[] {
  const allSetLogs: NewSetLog[] = [];

  entries.forEach((entry, index) => {
    const sets = exercises[index].sets_logs;

    sets.forEach((set) => {
      allSetLogs.push({
        workout_log_entry_id: entry.id,
        set_number: set.set_number,
        reps: set.reps || null,
        weight_kg: set.weight_kg || null,
        duration_sec: set.duration_sec || null,
        is_body_weight: set.is_body_weight,
        rest_between_sets_sec: set.rest_between_sets_sec,
        notes: set.notes || null,
      });
    });
  });

  return allSetLogs;
}
