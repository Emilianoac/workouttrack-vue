export interface Routine {
  id: string;
  name: string;
  description?: string;
  routines_exercises: RoutineExercise[];
}

export interface RoutineExercise {
  id: string;
  createdAt: Date;
  routine_id: string;
  exercise_id: string;
  measurement: "reps" | "time";
  order: number;
  sets: number;
  reps?: number;
  duration_sec?: number;
  rest_seconds?: number;
  notes?: string;
  exercise: Exercise;
}

export interface Exercise {
  id: string;
  createdAt: Date;
  name: string;
  image: string;
}

export type EditableRoutine = {
  name: string;
  description?: string;
  routines_exercises: EditableRoutineExercise[];
};

export type EditableRoutineExercise = {
  id?: string;
  createdAt?: Date;
  routine_id?: string;
  exercise_id: string | null;
  measurement: "reps" | "time" | null;
  order: number | null;
  sets: number | null;
  reps: number | null;
  duration_sec: number | null;
  rest_seconds: number | null;
  notes: string | null;
  exercise?: Exercise;
};
