<script lang="ts" setup>
  import Alert from "@/components/Shared/Alert.vue";
  import SiteBrand from "@/components/Shared/SiteBrand.vue";
  import { useRouter } from "vue-router";
  import { reactive, ref, watch } from "vue";
  import { useFormValidation } from "@/composables/useFormValidation";
  import { useAuth } from "@/composables/auth/useAuth";
  import { loginSchema, type LoginSchema } from "@/schemas/authSchema";
  import { mapSupabaseError } from "@/errors/mapSupabaseError";
  import { getAuthErrorMessage } from "@/errors/authMessages";

  const router = useRouter();
  const { formFieldsErrors, validate } = useFormValidation();
  const { signInWithEmail, isLoading } = useAuth();

  const formData = reactive<LoginSchema>({ email: "", password: "" });
  const error = ref<string | null>(null);
  const isSubmitted = ref(false);

  async function handleLogin() {
    error.value = null;
    isSubmitted.value = true;

    const isValid = validate(loginSchema, formData);
    if (!isValid) return false;

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

  defineExpose({
    isSubmitted,
    formFieldsErrors,
    formData,
    error,
    isLoading,
    handleLogin,
  });
</script>

<template>
  <form
    @submit.prevent="handleLogin"
    class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 max-w-md w-full"
    data-testid="login-form"
  >
    <SiteBrand class="mb-4 mx-auto w-52" />
    <h2 class="text-xl font-bold mb-4 text-center">Iniciar sesión</h2>

    <!-- Email -->
    <div>
      <label class="block text-sm font-semibold mb-2">Correo electrónico </label>
      <input
        class="border border-gray-300 dark:border-slate-600 rounded-lg p-2 w-full dark:bg-slate-700 dark:text-white"
        type="email"
        placeholder="Tu correo electrónico"
        data-testid="email-input"
        v-model="formData.email"
      />
      <div v-if="isSubmitted && formFieldsErrors?.email" data-testid="email-errors">
        <p class="text-red-500 text-sm mt-1">
          {{ formFieldsErrors.email.errors[0] }}
        </p>
      </div>
    </div>

    <!-- Password -->
    <div class="mt-4">
      <label class="block text-sm font-semibold mb-2">Contraseña</label>
      <input
        class="border border-gray-300 dark:border-slate-600 rounded-lg p-2 w-full dark:bg-slate-700 dark:text-white"
        type="password"
        placeholder="Tu contraseña"
        data-testid="password-input"
        v-model="formData.password"
      />
      <div v-if="isSubmitted && formFieldsErrors?.password" data-testid="password-errors">
        <p class="text-red-500 text-sm mt-1">
          {{ formFieldsErrors.password.errors[0] }}
        </p>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="mt-6">
      <button
        :disabled="isLoading"
        data-testid="submit-button"
        class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {{ isLoading ? "Iniciando sesión..." : "Iniciar sesión" }}
      </button>
    </div>

    <!-- Links -->
    <div class="flex justify-between items-center mt-4 text-xs text-gray-600 dark:text-slate-400">
      <p>
        ¿No tienes una cuenta?
        <router-link :to="{ name: 'register' }" class="text-blue-500 hover:underline">Regístrate</router-link>
      </p>
      <router-link :to="{ name: 'forgot-password' }" class="hover:underline">¿Olvidaste tu contraseña?</router-link>
    </div>

    <Alert v-if="error" type="error" :message="error" class="text-sm mt-4" data-testid="error-alert" />
  </form>
</template>

<style lang="postcss" scoped></style>
