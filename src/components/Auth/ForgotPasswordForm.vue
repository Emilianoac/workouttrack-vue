<script lang="ts" setup>
  import { ref } from "vue";
  import { useAuth } from "@/composables/useAuth";
  import { mapSupabaseError } from "@/errors/mapSupabaseError";
  import { getAuthErrorMessage } from "@/errors/authMessages";
  import Alert from "@/components/Shared/Alert.vue";
  import SiteBrand from "@/components/Shared/SiteBrand.vue";

  const { isLoading, sendResetPasswordEmail } = useAuth();

  const email = ref("");
  const error = ref<string | null>(null);
  const success = ref<string | null>(null);

  async function handleResetPassword() {
    error.value = null;
    if (!email.value) {
      error.value = "Ingresa un correo electrónico válido.";
      return;
    }

    try {
      await sendResetPasswordEmail(email.value);

      success.value = "Se ha enviado un enlace de restablecimiento a tu correo electrónico.";
    } catch (err) {
      const code = mapSupabaseError(err);
      error.value = getAuthErrorMessage(code);
    }
  }
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
        v-model="email"
      />
    </div>

    <!-- Submit Button -->
    <div class="mt-6">
      <button
        :disabled="!!success || isLoading"
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
