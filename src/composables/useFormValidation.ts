import { ref } from "vue";
import { z } from "zod/v4";

type ZodErrorNode = {
  errors?: string[];
  properties?: Record<string, ZodErrorNode>;
  items?: ZodErrorNode[];
};

export function useFormValidation<T extends z.ZodTypeAny>() {
  const formFieldsErrors = ref<Record<string, { errors: string[]; items?: ZodErrorNode[] }> | undefined>(undefined);

  function validate(schema: T, data: unknown): data is z.infer<T> {
    const result = schema.safeParse(data);
    if (!result.success) {
      const tree = z.treeifyError(result.error);
      if ("properties" in tree && tree.properties) {
        formFieldsErrors.value = tree.properties as unknown as Record<
          string,
          { errors: string[]; items?: ZodErrorNode[] }
        >;
      } else {
        formFieldsErrors.value = undefined;
      }
      return false;
    } else {
      formFieldsErrors.value = undefined;
      return true;
    }
  }

  return {
    formFieldsErrors,
    validate,
  };
}
