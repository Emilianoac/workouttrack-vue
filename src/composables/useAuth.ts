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
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      user.value = data.user;
      return data;
    } finally {
      isLoading.value = false;
    }
  }

  async function signUpWithEmail(email: string, password: string) {
    isLoading.value = true;
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return data;
    } finally {
      isLoading.value = false;
    }
  }

  async function signOut() {
    isLoading.value = true;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      user.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  async function exchangeCodeForSession(url: string) {
    const { error } = await supabase.auth.exchangeCodeForSession(url);
    if (error) throw error;
  }

  async function sendResetPasswordEmail(email: string) {
    isLoading.value = true;
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/cambiar-contrasena`,
      });
      if (error) throw error;
      return { success: true, message: "Password reset email sent." };
    } finally {
      isLoading.value = false;
    }
  }

  async function updatePassword(newPassword: string) {
    isLoading.value = true;
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
    } finally {
      isLoading.value = false;
    }
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
