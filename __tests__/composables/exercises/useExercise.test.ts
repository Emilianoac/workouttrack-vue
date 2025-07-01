import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { useExercise } from "@/composables/exercises/useExercise";
import { fetchExercises } from "@/services/exercise/exerciseService";

vi.mock("@/services/exercise/exerciseService");

describe("useExercises", () => {
  const mockExercises = [
    { id: 1, name: "Squat", image: "squat.png" },
    { id: 2, name: "Push-up", image: "pushup.png" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("loads exercises successfully", async () => {
    (fetchExercises as Mock).mockResolvedValue(mockExercises);
    const { exercises, loading, error, getExercices } = useExercise();

    await getExercices();

    expect(loading.value).toBe(false);
    expect(error.value).toBe(false);
    expect(exercises.value).toEqual(mockExercises);
  });

  it("sets error when fetch fails", async () => {
    (fetchExercises as Mock).mockRejectedValue(new Error("API error"));
    const { exercises, loading, error, getExercices } = useExercise();

    await getExercices();

    expect(loading.value).toBe(false);
    expect(error.value).toBe(true);
    expect(exercises.value).toBeInstanceOf(Array);
  });
});
