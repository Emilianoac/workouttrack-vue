import { supabase } from "@/lib/supabaseClient";
import { reactive, onMounted } from "vue";

export function useWorkoutChartData() {
  const weight = reactive({
    data: [] as number[][],
    lastWeight: 0,
    loading: false,
    error: {
      isError: false,
      message: "",
    },
  });

  async function fetchWeighData() {
    weight.loading = true;
    weight.error.isError = false;
    weight.error.message = "";

    try {
      const { data: result, error: err } = await supabase
        .from("workout_logs")
        .select("created_at, body_weight_kg")
        .order("created_at", { ascending: true });

      if (err) throw new Error(err.message);

      weight.data = result.map((item) => [new Date(item.created_at).getTime(), item.body_weight_kg]);
    } catch (err) {
      weight.error.isError = true;
      weight.error.message = "Ocurrió un error al cargar los datos. Intenta nuevamente más tarde.";
      console.error("Error al cargar los datos de Supabase:", err instanceof Error ? err.message : err);
    } finally {
      weight.loading = false;
    }
  }

  onMounted(() => {
    fetchWeighData();
  });

  return {
    weight,
  };
}
