import type { EditableRoutine, EditableRoutineExercise, Routine } from "@/types/routine";

export function routineToEditable(data: Routine): EditableRoutine {
  console.log("Convirtiendo rutina de Supabase a editable:", data);
  return {
    name: data.name,
    description: data.description,
    routines_exercises: data.routines_exercises.map(
      (ex): EditableRoutineExercise => ({
        exercise_id: ex.exercise.id,
        order: ex.order,
        measurement: ex.measurement,
        sets: ex.sets,
        reps: ex.reps ?? null,
        duration_sec: ex.duration_sec ?? null,
        rest_seconds: ex.rest_seconds ?? null,
        notes: ex.notes ?? null,
      }),
    ),
  };
}
