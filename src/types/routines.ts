export interface Routine {
  id: string;
  name: string;
  description?: string;
  routines_exercises: RoutineExercise[];
}

export interface RoutineExercise {
  id: string;
  createdAt: Date;
  routineId: string;
  exerciseId: string;
  measurement: "reps" | "time";
  order: number; // Order of the exercise in the routine
  sets: number;
  reps?: number;
  duration_sec?: number; // Duration in seconds, if applicable
  rest_seconds?: number; // Rest time in seconds, if applicable
  notes?: string; // Additional notes for the exercise
  exercise: Exercise;
}

export interface Exercise {
  id: string;
  createdAt: Date;
  name: string;
  image: string; // URL or path to the exercise image
}
