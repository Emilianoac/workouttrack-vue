<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import { useRouter } from "vue-router";
  import { useAuth } from "@/composables/useAuth";
  import { mapSupabaseError } from "@/errors/mapSupabaseError";
  import { getAuthErrorMessage } from "@/errors/authMessages";
  import Alert from "@/components/Shared/Alert.vue";
  import SiteBrand from "@/components/Shared/SiteBrand.vue";

  const router = useRouter();
  const { isLoading, updatePassword, signOut } = useAuth();
  const newPassword = ref("");
  const error = ref<string | null>(null);
  const success = ref<string | null>(null);

  async function handleChangePassword() {
    if (!newPassword.value) {
      error.value = "Por favor, ingresa una nueva contraseña.";
      return;
    }

    try {
      await updatePassword(newPassword.value);
      success.value = "Contraseña cambiada exitosamente.";

      setTimeout(() => {
        success.value = null;
        error.value = null;
        signOut();
        router.push({ name: "login" });
      }, 3000);
    } catch (err) {
      const code = mapSupabaseError(err);
      error.value = getAuthErrorMessage(code);
    }
  }

  onMounted(async () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  });
</script>

<template>
  <form
    @submit.prevent="handleChangePassword"
    class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 max-w-md w-full"
  >
    <SiteBrand class="mb-4 mx-auto w-52" />
    <h2 class="text-xl font-bold mb-4 text-center">Restablecer contraseña</h2>

    <!-- New Password -->
    <div>
      <label class="block text-sm font-semibold mb-2">Nueva contraseña</label>
      <input
        class="border border-gray-300 dark:border-slate-600 rounded-lg p-2 w-full dark:bg-slate-700 dark:text-white"
        type="password"
        placeholder="Tu correo electrónico"
        v-model="newPassword"
      />
    </div>

    <!-- Submit Button -->
    <div class="mt-6">
      <button
        :disabled="!!success || isLoading"
        class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {{ isLoading ? "Cambiando..." : "Cambiar contraseña" }}
      </button>
    </div>

    <Alert v-if="error" type="error" :message="error" class="text-sm mt-4" />
    <Alert v-if="success" type="success" :message="success" class="text-sm mt-4" />
  </form>
</template>

<style lang="postcss" scoped></style>
