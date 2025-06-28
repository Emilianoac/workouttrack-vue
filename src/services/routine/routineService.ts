import { supabase } from "@/lib/supabaseClient";
import type { EditableRoutine, Routine } from "@/types/routines";

export async function fetchRoutines(userId: string): Promise<Routine[]> {
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
        notes,
        exercise:exercise_id (
          id,
          name,
          image
        )
      )
    `,
    )
    .order("created_at", { ascending: true })
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  return data as unknown as Routine[];
}

export async function fetchRoutineById(id: string, userId: string): Promise<Routine | null> {
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
        notes,
        exercise:exercise_id (
          id,
          name,
          image
        )
      )
    `,
    )
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) throw new Error(error.message);
  const normalizedData = data as unknown as Routine;
  return normalizedData;
}

export async function createRoutine(routine: EditableRoutine, userId: string) {
  const { data, error } = await supabase
    .from("routines")
    .insert({ name: routine.name, description: routine.description, user_id: userId })
    .select();

  if (error) throw new Error(error.message);

  const routineId = data?.[0]?.id;

  const exercises = routine.routines_exercises.map((ex, i) => ({
    ...ex,
    routine_id: routineId,
    user_id: userId,
    order: i + 1,
  }));

  const { error: insertError } = await supabase.from("routines_exercises").insert(exercises);
  if (insertError) throw new Error(insertError.message);

  console.log("Routine created with ID:", routineId);
}

export async function updateRoutine(routineId: string, routine: EditableRoutine, userId: string) {
  if (!routineId) throw new Error("Routine ID is required");

  await updateRoutineMetadata(routineId, routine, userId);
  await updateRoutineExercises(routineId, routine, userId);
  console.log("Routine updated with ID:", routineId);
}

export async function deleteRoutineAPI(routineId: string, userId: string) {
  const { error } = await supabase.from("routines").delete().eq("id", routineId).eq("user_id", userId);

  if (error) throw new Error(error.message);

  console.log("Routine deleted with ID:", routineId);
}

async function updateRoutineMetadata(routineId: string, data: Partial<EditableRoutine>, userId: string) {
  const { error: updateError } = await supabase
    .from("routines")
    .update({
      name: data.name,
      description: data.description,
    })
    .eq("id", routineId)
    .eq("user_id", userId);

  if (updateError) throw new Error(updateError.message);
  console.log("Routine metadata updated for ID:", routineId);
}

async function updateRoutineExercises(routineId: string, data: Partial<EditableRoutine>, userId: string) {
  if (!routineId) throw new Error("Routine ID is required");
  if (!data.routines_exercises || data.routines_exercises.length === 0) {
    throw new Error("No exercises provided to update");
  }

  const { error: deleteError } = await supabase.from("routines_exercises").delete().eq("routine_id", routineId);

  if (deleteError) throw new Error(deleteError.message);

  const { error: insertError } = await supabase.from("routines_exercises").insert(
    data.routines_exercises.map((exercise, index) => ({
      user_id: userId,
      routine_id: routineId,
      exercise_id: exercise.exercise_id,
      order: index + 1,
      sets: exercise.sets,
      reps: exercise.reps || null,
      duration_sec: exercise.duration_sec || null,
      rest_seconds: exercise.rest_seconds || null,
      measurement: exercise.measurement,
      notes: exercise.notes || null,
    })),
  );

  if (insertError) throw new Error(insertError.message);

  console.log("Routine exercises updated for ID:", routineId);
}
