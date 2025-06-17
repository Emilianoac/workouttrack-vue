<script lang="ts" setup>
  import { ref, reactive, watch } from "vue";
  import { registerSchema, type RegisterSchema } from "@/schemas/authSchema";
  import { mapSupabaseError } from "@/errors/mapSupabaseError";
  import { getAuthErrorMessage } from "@/errors/authMessages";
  import { useFormValidation } from "@/composables/useFormValidation";

  import { useAuth } from "@/composables/useAuth";
  import Alert from "@/components/Shared/Alert.vue";
  import SiteBrand from "@/components/Shared/SiteBrand.vue";

  const { signUpWithEmail, isLoading } = useAuth();
  const { validate, formFieldsErrors } = useFormValidation();

  const formData = reactive<RegisterSchema>({
    email: "",
    password: "",
  });
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
</script>

<template>
  <form @submit.prevent="handleLogin" class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 max-w-md w-full">
    <SiteBrand class="mb-4 mx-auto w-52" />
    <h2 class="text-xl font-bold mb-4 text-center">Registrarse</h2>

    <!-- Email -->
    <div>
      <label class="block text-sm font-semibold mb-2">Correo electrónico </label>
      <input
        class="border border-gray-300 dark:border-slate-600 rounded-lg p-2 w-full dark:bg-slate-700 dark:text-white"
        type="email"
        placeholder="Tu correo electrónico"
        v-model="formData.email"
      />
      <template v-if="isSubmitted && formFieldsErrors?.email">
        <p v-for="error in formFieldsErrors.email.errors" class="text-red-500 text-sm mt-1" :key="error">
          {{ error }}
        </p>
      </template>
    </div>

    <!-- Password -->
    <div class="mt-4">
      <label class="block text-sm font-semibold mb-2">Contraseña</label>
      <input
        class="border border-gray-300 dark:border-slate-600 rounded-lg p-2 w-full dark:bg-slate-700 dark:text-white"
        type="password"
        placeholder="Tu contraseña"
        v-model="formData.password"
      />
      <template v-if="isSubmitted && formFieldsErrors?.password">
        <p v-for="error in formFieldsErrors.password.errors" class="text-red-500 text-sm mt-1" :key="error">
          {{ error }}
        </p>
      </template>
    </div>

    <!-- Submit Button -->
    <div class="mt-6">
      <button
        :disabled="isLoading"
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
