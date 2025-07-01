import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchExercises } from "@/services/exercise/exerciseService";
import { supabase, mockSelect, mockOrder } from "../../__mocks__/supabaseClient";

vi.mock("@/lib/supabaseClient", async () => {
  const mock = await import("../../__mocks__/supabaseClient");
  return { supabase: mock.supabase };
});

describe("fetchExercises", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return exercises when successful", async () => {
    const mockData = [
      { id: 1, name: "Squat", image: "squat.png" },
      { id: 2, name: "Push-up", image: "pushup.png" },
    ];

    mockOrder.mockReturnValue({
      data: mockData,
      error: null,
    });

    const result = await fetchExercises();

    expect(result).toEqual(mockData);
    expect(supabase.from).toHaveBeenCalledWith("exercises");
    expect(mockSelect).toHaveBeenCalled();
    expect(mockOrder).toHaveBeenCalledWith("created_at", { ascending: true });
  });

  it("should throw an error when supabase returns an error", async () => {
    mockOrder.mockReturnValue({
      data: null,
      error: { message: "Something went wrong" },
    });

    await expect(fetchExercises()).rejects.toThrow("Something went wrong");
  });
});
