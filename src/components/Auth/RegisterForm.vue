<script lang="ts" setup>
  import { ref, reactive, watch } from "vue";
  import { registerSchema, type RegisterSchema } from "@/schemas/authSchema";
  import { mapSupabaseError } from "@/errors/mapSupabaseError";
  import { getAuthErrorMessage } from "@/errors/authMessages";
  import { useFormValidation } from "@/composables/useFormValidation";

  import { useAuth } from "@/composables/auth/useAuth";
  import Alert from "@/components/Shared/Alert.vue";
  import SiteBrand from "@/components/Shared/SiteBrand.vue";

  const { signUpWithEmail, isLoading } = useAuth();
  const { validate, formFieldsErrors } = useFormValidation();

  const formData = reactive<RegisterSchema>({ email: "", password: "" });
  const isSubmitted = ref(false);
  const error = ref<string | null>(null);

  async function handleLogin() {
    isSubmitted.value = true;
    error.value = null;
    if (!validate(registerSchema, formData)) return;

    try {
      await signUpWithEmail(formData.email, formData.password);
    } catch (err) {
      const code = mapSupabaseError(err);
      error.value = getAuthErrorMessage(code);
    }
  }

  watch(
    () => formData,
    (newValue) => {
      if (isSubmitted.value) {
        validate(registerSchema, newValue);
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
    data-testid="register-form"
  >
    <SiteBrand class="mb-4 mx-auto w-52" />
    <h2 class="text-xl font-bold mb-4 text-center">Registrarse</h2>

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
        {{ isLoading ? "Registrando..." : "Registrarse" }}
      </button>
    </div>

    <!-- Links -->
    <div class="flex justify-center items-center mt-4 text-gray-600 dark:text-slate-400 gap-2">
      <hr class="flex-grow border-t border-gray-300 dark:border-slate-600" />
      <span class="text-sm">O</span>
      <hr class="flex-grow border-t border-gray-300 dark:border-slate-600" />
    </div>

    <div class="flex justify-center items-center mt-2 text-gray-600 dark:text-slate-400">
      <p>
        ¿Ya tienes una cuenta?
        <router-link :to="{ name: 'login' }" class="text-blue-500 hover:underline"> Inicia sesión </router-link>
      </p>
    </div>

    <Alert v-if="error" type="error" :message="error" class="text-sm mt-4" />
  </form>
</template>

<style lang="postcss" scoped></style>
