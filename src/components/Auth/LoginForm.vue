<script lang="ts" setup>
  import Alert from "@/components/Shared/Alert.vue";
  import SiteBrand from "@/components/Shared/SiteBrand.vue";
  import { useLoginForm } from "@/composables/auth/useLoginForm";

  const { formData, handleLogin, error, isLoading, isSubmitted, formFieldsErrors } = useLoginForm();
</script>

<template>
  <form @submit.prevent="handleLogin" class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 max-w-md w-full">
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
        <p v-for="error in formFieldsErrors.email.errors" class="text-red-500 text-sm mt-1" :key="error">
          {{ error }}
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
