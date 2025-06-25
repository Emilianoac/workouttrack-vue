import { ref, watch } from "vue";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/composables/auth/useAuth";
import { workoutLogSchema } from "@/schemas/workoutRegistrationSchema";
import { useFormValidation } from "@/composables/useFormValidation";

import type { RoutineExercise, Routine } from "@/types/routines";
import type { NewSetLog } from "@/types/workoutLog";

export default function useWorkoutLogger() {
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

  async function saveData() {
    if (!user.value) return;

    const isValid = validate(workoutLogSchema, {
      workoutDate: workoutDate.value,
      bodyWeight: bodyWeight.value,
      selectedRoutineId: selectedRoutineId.value,
      exercises: exercises.value,
    });

    if (!isValid) return;

    try {
      // 1. Add workout log
      const { data: logData, error: logError } = await supabase
        .from("workout_logs")
        .insert({
          routine_id: selectedRoutineId.value,
          created_at: workoutDate.value,
          notes: null,
          body_weight_kg: bodyWeight.value,
          user_id: user.value?.id,
        })
        .select()
        .single();

      if (logError) throw new Error(logError.message);

      // 2. Create and sanitize entries payload
      if (!logData || !logData.id) {
        throw new Error("No se pudo crear el workout log.");
      }
      if (exercises.value.length === 0) {
        throw new Error("No hay ejercicios para guardar.");
      }
      const entriesPayload = exercises.value.map((ej, index) => {
        const exData = ej.exerciseTargetData ? JSON.parse(JSON.stringify(ej.exerciseTargetData)) : null;

        return {
          workout_log_id: logData.id,
          order: index + 1,
          exercise_id: exData?.exercise?.id || ej.exerciseId, // fallback por si exerciseTargetData no está listo
          target_sets: exData?.sets || 0,
          target_reps: exData?.reps || null,
          target_duration_sec: exData?.duration_sec || null,
          target_rest_between_sets_sec: exData?.rest_seconds || null,
        };
      });

      const { data: entryData, error: entryError } = await supabase
        .from("workout_log_entries")
        .insert(entriesPayload)
        .select();

      if (entryError) throw new Error(entryError.message);

      // 3. Create and sanitize set logs payload
      if (!entryData || entryData.length === 0) {
        throw new Error("No se pudieron crear las entradas del workout log.");
      }
      if (exercises.value.length === 0 || !exercises.value.some((e) => e.sets_logs.length > 0)) {
        throw new Error("No hay sets para guardar.");
      }

      const allSetLogs: NewSetLog[] = [];

      entryData.forEach((entry, index) => {
        const sets = exercises.value[index].sets_logs;
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

      // Insert all set logs in one go
      if (allSetLogs.length > 0) {
        console.log("Set logs to insert:", allSetLogs);
        const { error: setLogsError } = await supabase.from("set_logs").insert(allSetLogs);
        if (setLogsError) throw new Error(setLogsError.message);
      }

      // 4. Reset state
      exercises.value = [
        {
          exerciseId: "",
          exerciseTargetData: null,
          sets_logs: [],
        },
      ];
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
    saveData,
    setExerciseTargetData,
    formFieldsErrors,
  };
}
