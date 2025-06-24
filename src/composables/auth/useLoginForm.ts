import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useFormValidation } from "@/composables/useFormValidation";
import { useAuth } from "@/composables/useAuth";
import { mapSupabaseError } from "@/errors/mapSupabaseError";
import { getAuthErrorMessage } from "@/errors/authMessages";
import { loginSchema, type LoginSchema } from "@/schemas/authSchema";

export function useLoginForm() {
  const router = useRouter();
  const { formFieldsErrors, validate } = useFormValidation();
  const { signInWithEmail, isLoading } = useAuth();

  const formData = reactive<LoginSchema>({ email: "", password: "" });
  const error = ref<string | null>(null);
  const isSubmitted = ref(false);

  async function handleLogin() {
    error.value = null;
    isSubmitted.value = true;
    if (!validate(loginSchema, formData)) return false;

    try {
      await signInWithEmail(formData.email, formData.password);
      router.push("/");
      return true;
    } catch (err) {
      const code = mapSupabaseError(err);
      error.value = getAuthErrorMessage(code);
      return false;
    }
  }

  watch(
    () => formData,
    (newValue) => {
      if (isSubmitted.value) {
        validate(loginSchema, newValue);
        error.value = null;
      }
    },
    { deep: true },
  );

  return {
    formData,
    handleLogin,
    error,
    isLoading,
    isSubmitted,
    formFieldsErrors,
  };
}
