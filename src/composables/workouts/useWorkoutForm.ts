import { ref, watch } from "vue";
import { useAuth } from "@/composables/auth/useAuth";
import { workoutLogSchema } from "@/schemas/workoutRegistrationSchema";
import { useFormValidation } from "@/composables/useFormValidation";
import { buildWorkoutLogPayload, buildSetLogsPayload } from "@/services/workout/workoutPayloadBuilder";
import {
  createWorkoutLogMetadata,
  createWorkoutLogEntry,
  createWorkoutSetLogs,
} from "@/services/workout/workoutService";

import type { RoutineExercise, Routine } from "@/types/routine";
import type { NewSetLog } from "@/types/workoutLog";

export default function useWorkoutForm() {
  const { user } = useAuth();
  const { formFieldsErrors, validate } = useFormValidation();

  const workoutDate = ref(new Date().toLocaleDateString("sv-SE"));
  const bodyWeight = ref(0);
  const selectedRoutineId = ref("");

  const exercises = ref([
    {
      exerciseId: "",
      exerciseTargetData: null as RoutineExercise | null,
      sets_logs: [] as NewSetLog[],
    },
  ]);

  async function saveWorkout() {
    if (!user.value) return;

    const isValid = validate(workoutLogSchema, {
      workoutDate: workoutDate.value,
      bodyWeight: bodyWeight.value,
      selectedRoutineId: selectedRoutineId.value,
      exercises: exercises.value,
    });

    if (!isValid) return;

    try {
      const logData = await createWorkoutLogMetadata({
        routineId: selectedRoutineId.value,
        workoutDate: workoutDate.value,
        bodyWeight: bodyWeight.value,
        userId: user.value.id,
      });

      const workoutLogEntryPayload = buildWorkoutLogPayload(exercises.value, logData.id);
      const entryData = await createWorkoutLogEntry(workoutLogEntryPayload);

      const setLogsPayload = buildSetLogsPayload(entryData, exercises.value);

      if (setLogsPayload.length > 0) {
        console.log("Set logs to insert:", setLogsPayload);
        createWorkoutSetLogs(setLogsPayload);
      }

      exercises.value = [{ exerciseId: "", exerciseTargetData: null, sets_logs: [] }];
      selectedRoutineId.value = "";
      workoutDate.value = new Date().toISOString().split("T")[0];
      bodyWeight.value = 0;

      console.log("Workout log guardado exitosamente:", logData);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al guardar workout log:", error.message);
        alert(`Error al guardar workout log: ${error.message}`);
      } else {
        console.error("Error desconocido:", error);
        alert("Error desconocido al guardar workout log.");
      }
    }
  }

  function addExercise() {
    exercises.value.push({
      exerciseId: "",
      exerciseTargetData: null,
      sets_logs: [],
    });
  }

  function removeExercise(index: number) {
    if (exercises.value.length > 1) {
      exercises.value.splice(index, 1);
    }
  }

  function addSet(exerciseIndex: number) {
    const exercise = exercises.value[exerciseIndex];
    exercise.sets_logs.push({
      workout_log_entry_id: "",
      set_number: exercise.sets_logs.length + 1,
      reps: 0,
      weight_kg: 0,
      is_body_weight: false,
      duration_sec: 0,
      rest_between_sets_sec: 0,
      notes: null,
    });
  }

  function removeSet(exerciseIndex: number, setIndex: number) {
    const exercise = exercises.value[exerciseIndex];

    if (exercise.sets_logs.length > 1) {
      exercise.sets_logs.splice(setIndex, 1);

      exercise.sets_logs.forEach((set, index) => {
        set.set_number = index + 1;
      });
    }
  }

  function setExerciseTargetData(routines: Routine[], exerciseIndex: number) {
    const exerciseId = exercises.value[exerciseIndex].exerciseId;
    const routine = routines?.find((r) => r.routines_exercises.some((re) => re.exercise.id === exerciseId));

    if (routine) {
      // Make a deep copy to avoid reactivity issues
      const plainRoutine = JSON.parse(JSON.stringify(routine));
      const routineExercise = plainRoutine.routines_exercises.find(
        (re: RoutineExercise) => re.exercise.id === exerciseId,
      );

      exercises.value[exerciseIndex].exerciseTargetData = routineExercise ?? null;
    } else {
      exercises.value[exerciseIndex].exerciseTargetData = null;
    }
  }

  watch(
    () => [exercises.value, workoutDate.value, bodyWeight.value, selectedRoutineId.value],
    (newValue) => {
      validate(workoutLogSchema, {
        workoutDate: workoutDate.value,
        bodyWeight: bodyWeight.value,
        selectedRoutineId: selectedRoutineId.value,
        exercises: newValue,
      });
    },
    { deep: true },
  );

  return {
    exercises,
    addExercise,
    removeExercise,
    addSet,
    removeSet,
    workoutDate,
    bodyWeight,
    selectedRoutineId,
    saveWorkout,
    setExerciseTargetData,
    formFieldsErrors,
  };
}
