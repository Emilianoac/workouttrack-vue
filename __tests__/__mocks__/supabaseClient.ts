import { vi } from "vitest";

export const mockSelect = vi.fn();
export const mockOrder = vi.fn();

export const supabase = {
  from: vi.fn(() => ({
    select: mockSelect,
  })),
};

mockSelect.mockReturnValue({
  order: mockOrder,
});
