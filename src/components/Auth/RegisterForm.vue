<script lang="ts" setup>
  import { ref } from "vue";
  import { mapSupabaseError } from "@/errors/mapSupabaseError";
  import { getAuthErrorMessage } from "@/errors/authMessages";
  import { useAuth } from "@/composables/useAuth";
  import Alert from "@/components/Shared/Alert.vue";
  import SiteBrand from "@/components/Shared/SiteBrand.vue";

  const { signUpWithEmail, isLoading } = useAuth();

  const email = ref("");
  const password = ref("");
  const error = ref<string | null>(null);

  async function handleLogin() {
    if (!email.value || !password.value) {
      error.value = "Ingresa un correo electrónico y una contraseña válidos.";
      return;
    }

    try {
      await signUpWithEmail(email.value, password.value);
    } catch (err) {
      const code = mapSupabaseError(err);
      error.value = getAuthErrorMessage(code);
    }
  }
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
        v-model="email"
      />
    </div>

    <!-- Password -->
    <div class="mt-4">
      <label class="block text-sm font-semibold mb-2">Contraseña</label>
      <input
        class="border border-gray-300 dark:border-slate-600 rounded-lg p-2 w-full dark:bg-slate-700 dark:text-white"
        type="password"
        placeholder="Tu contraseña"
        v-model="password"
      />
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
