import { ref } from "vue";
import { z } from "zod/v4";

type ZodErrorNode = {
  errors?: string[];
  properties?: Record<string, ZodErrorNode>;
  items?: ZodErrorNode[];
};

type FieldErrors = Record<string, { errors: string[]; items?: ZodErrorNode[] }> | undefined;

function parseData<T extends z.ZodTypeAny>(schema: T, data: unknown) {
  return schema.safeParse(data);
}

function extractFieldErrors(error: z.ZodError): FieldErrors {
  const tree = z.treeifyError(error);
  if ("properties" in tree && tree.properties) {
    return tree.properties as unknown as FieldErrors;
  }
  return undefined;
}

export function useFormValidation<T extends z.ZodTypeAny>() {
  const formFieldsErrors = ref<FieldErrors>(undefined);

  function validate(schema: T, data: unknown): data is z.infer<T> {
    const result = parseData(schema, data);
    if (result.success) {
      formFieldsErrors.value = undefined;
      return true;
    } else {
      formFieldsErrors.value = extractFieldErrors(result.error);
      return false;
    }
  }

  return {
    formFieldsErrors,
    validate,
  };
}
