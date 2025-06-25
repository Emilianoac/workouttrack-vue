import { z } from "zod/v4";

const setLogSchema = z.object({
  workout_log_entry_id: z.string().optional(),
  set_number: z.number().min(1),
  reps: z.number().min(0).nullable(),
  weight_kg: z.number().min(0).nullable(),
  duration_sec: z.number().min(0).nullable(),
  is_body_weight: z.boolean(),
  rest_between_sets_sec: z.number().min(0),
  notes: z.string().nullable().optional(),
});

const exerciseSchema = z.object({
  exerciseId: z.string().min(1, { error: "Debes seleccionar un ejercicio." }),
  exerciseTargetData: z.any().nullable(),
  sets_logs: z.array(setLogSchema).min(1, { error: "Debes agregar al menos un set." }),
});

const workoutLogSchema = z.object({
  workoutDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { error: "Fecha inválida" }),
  bodyWeight: z.number().min(1, { error: "El peso corporal debe ser mayor a 0." }),
  selectedRoutineId: z.string().min(1, { error: "Debes seleccionar una rutina." }),
  exercises: z.array(exerciseSchema).min(1, { error: "Debes agregar al menos un ejercicio." }),
});

export type WorkoutLog = z.infer<typeof workoutLogSchema>;
export type NewSetLog = z.infer<typeof setLogSchema>;
export type NewExerciseLog = z.infer<typeof exerciseSchema>;
export type WorkoutLogData = z.infer<typeof workoutLogSchema>;

export { workoutLogSchema, setLogSchema, exerciseSchema };
