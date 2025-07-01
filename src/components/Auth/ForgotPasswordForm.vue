<script lang="ts" setup>
  import { ref, reactive, watch } from "vue";
  import { useFormValidation } from "@/composables/useFormValidation";
  import { useAuth } from "@/composables/auth/useAuth";
  import { forgotPasswordSchema } from "@/schemas/authSchema";
  import Alert from "@/components/Shared/Alert.vue";
  import SiteBrand from "@/components/Shared/SiteBrand.vue";

  const { isLoading, sendResetPasswordEmail } = useAuth();
  const { validate, formFieldsErrors } = useFormValidation();

  const formData = reactive({ email: "" });
  const error = ref<string | null>(null);
  const isSubmitted = ref(false);
  const success = ref<string | null>(null);

  async function handleResetPassword() {
    error.value = null;
    isSubmitted.value = true;
    if (!validate(forgotPasswordSchema, formData)) return;

    try {
      await sendResetPasswordEmail(formData.email);
      success.value = "Se ha enviado un enlace de restablecimiento a tu correo electrónico.";
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "Error desconocido al enviar el enlace de restablecimiento.";
      }
    }
  }

  watch(
    () => formData,
    (newValue) => {
      if (isSubmitted.value) {
        validate(forgotPasswordSchema, newValue);
        error.value = null;
      }
    },
    { deep: true },
  );
</script>

<template>
  <form
    @submit.prevent="handleResetPassword"
    class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 max-w-md w-full"
  >
    <SiteBrand class="mb-4 mx-auto w-52" />
    <h2 class="text-xl font-bold mb-4 text-center">Olvide mi contraseña</h2>

    <!-- Email -->
    <div>
      <label class="block text-sm font-semibold mb-2">Correo electrónico </label>
      <input
        class="border border-gray-300 dark:border-slate-600 rounded-lg p-2 w-full dark:bg-slate-700 dark:text-white"
        type="email"
        placeholder="Tu correo electrónico"
        v-model="formData.email"
      />
      <template v-if="formFieldsErrors?.email">
        <p v-for="error in formFieldsErrors.email.errors" :key="error" class="text-red-600 text-sm mt-1">
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
        {{ isLoading ? "Enviando..." : "Enviar enlace de restablecimiento" }}
      </button>
    </div>

    <router-link class="text-blue-600 hover:underline mt-4 block text-center" :to="{ name: 'login' }">
      Ir a iniciar sesión
    </router-link>

    <Alert v-if="error" type="error" :message="error" class="text-sm mt-4" />
    <Alert v-if="success" type="success" :message="success" class="text-sm mt-4" />
  </form>
</template>

<style lang="postcss" scoped></style>
