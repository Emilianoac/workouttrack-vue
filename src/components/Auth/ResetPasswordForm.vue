<script lang="ts" setup>
  import { onMounted, ref, reactive, watch } from "vue";
  import { useFormValidation } from "@/composables/auth/useFormValidation";
  import { useAuth } from "@/composables/auth/useAuth";
  import { useRouter } from "vue-router";
  import { mapSupabaseError } from "@/errors/mapSupabaseError";
  import { getAuthErrorMessage } from "@/errors/authMessages";
  import { resetPasswordSchema } from "@/schemas/authSchema";
  import Alert from "@/components/Shared/Alert.vue";
  import SiteBrand from "@/components/Shared/SiteBrand.vue";

  const router = useRouter();
  const { isLoading, updatePassword } = useAuth();
  const { validate, formFieldsErrors } = useFormValidation();

  const formData = reactive({ password: "" });
  const error = ref<string | null>(null);
  const invalidUrl = ref(false);
  const isSubmitted = ref(false);

  const success = ref<string | null>(null);

  async function handleChangePassword() {
    error.value = null;
    isSubmitted.value = true;
    if (!validate(resetPasswordSchema, formData)) return;

    try {
      await updatePassword(formData.password);
      success.value = "Contraseña cambiada exitosamente.";

      router.push("/");
    } catch (err) {
      const code = mapSupabaseError(err);
      error.value = getAuthErrorMessage(code);
    }
  }

  onMounted(async () => {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = hashParams.get("access_token");
    const type = hashParams.get("type");

    if (!accessToken || type !== "recovery") {
      invalidUrl.value = true;
      error.value = "Este enlace no es válido. Solicita uno nuevo.";
    } else {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  });

  watch(
    () => formData,
    (newValue) => {
      if (isSubmitted.value) {
        validate(resetPasswordSchema, newValue);
        error.value = null;
      }
    },
    { deep: true },
  );
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
        class="border border-gray-300 dark:border-slate-600 rounded-lg p-2 w-full dark:bg-slate-700 dark:text-white disabled:opacity-50"
        type="password"
        placeholder="Tu correo electrónico"
        :disabled="isLoading || invalidUrl"
        v-model="formData.password"
      />
      <template v-if="formFieldsErrors?.password">
        <p v-for="error in formFieldsErrors.password.errors" :key="error" class="text-red-600 text-sm mt-1">
          {{ error }}
        </p>
      </template>
    </div>

    <!-- Submit Button -->
    <div class="mt-6">
      <button
        :disabled="!!success || isLoading || invalidUrl"
        class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {{ isLoading ? "Cambiando..." : "Cambiar contraseña" }}
      </button>

      <router-link
        v-if="invalidUrl"
        :to="{ name: 'login' }"
        class="block text-center text-blue-600 hover:underline mt-4"
      >
        Volver al inicio de sesión
      </router-link>
    </div>

    <Alert v-if="error" type="error" :message="error" class="text-sm mt-4" />
    <Alert v-if="success" type="success" :message="success" class="text-sm mt-4" />
  </form>
</template>

<style lang="postcss" scoped></style>
