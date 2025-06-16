// composables/useAuth.ts
import { ref } from "vue";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

const user = ref<User | null>(null);
const isLoading = ref(false);

async function loadSession() {
  const { data } = await supabase.auth.getSession();
  user.value = data.session?.user ?? null;
}

loadSession();
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    user.value = session.user;
  } else {
    user.value = null;
  }
});

export function useAuth() {
  async function signInWithEmail(email: string, password: string) {
    isLoading.value = true;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    isLoading.value = false;
    if (error) throw error;
    user.value = data.user;
    return data;
  }

  async function signUpWithEmail(email: string, password: string) {
    isLoading.value = true;
    const { data, error } = await supabase.auth.signUp({ email, password });
    isLoading.value = false;
    console.log("Sign up data:", data);
    console.log("Sign up error:", error);
    if (error) throw error;
    return data;
  }

  async function signOut() {
    isLoading.value = true;
    const { error } = await supabase.auth.signOut();
    isLoading.value = false;
    if (error) throw error;
    user.value = null;
  }

  async function exchangeCodeForSession(url: string) {
    const { error } = await supabase.auth.exchangeCodeForSession(url);
    if (error) throw error;
  }

  async function sendResetPasswordEmail(email: string) {
    isLoading.value = true;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/cambiar-contrasena`,
    });
    if (error) throw error;

    isLoading.value = false;
    return { success: true, message: "Password reset email sent." };
  }

  async function updatePassword(newPassword: string) {
    isLoading.value = true;
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    isLoading.value = false;
  }

  function getSession() {
    return supabase.auth.getSession();
  }

  return {
    user,
    isLoading,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    sendResetPasswordEmail,
    exchangeCodeForSession,
    updatePassword,
    getSession,
  };
}
