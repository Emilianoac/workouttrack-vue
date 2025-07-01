import { ref } from "vue";
import {
  getSessionService,
  onAuthStateChangeService,
  signInWithEmailService,
  signUpWithEmailService,
  signOutService,
  exchangeCodeForSessionService,
  sendResetPasswordEmailService,
  updatePasswordService,
} from "@/services/auth/authService";
import type { User } from "@supabase/supabase-js";

const user = ref<User | null>(null);
const isLoading = ref(false);

async function loadSession() {
  user.value = await getSessionService();
}
loadSession();

onAuthStateChangeService((sessionUser) => {
  user.value = sessionUser;
});

export function useAuth() {
  async function signInWithEmail(email: string, password: string) {
    isLoading.value = true;
    try {
      const data = await signInWithEmailService(email, password);
      user.value = data.user;
      return data;
    } finally {
      isLoading.value = false;
    }
  }

  async function signUpWithEmail(email: string, password: string) {
    isLoading.value = true;
    try {
      const data = await signUpWithEmailService(email, password);
      return data;
    } finally {
      isLoading.value = false;
    }
  }

  async function signOut() {
    isLoading.value = true;
    try {
      await signOutService();
      user.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  async function exchangeCodeForSession(url: string) {
    await exchangeCodeForSessionService(url);
  }

  async function sendResetPasswordEmail(email: string) {
    isLoading.value = true;
    try {
      await sendResetPasswordEmailService(email);
      return { success: true, message: "Password reset email sent." };
    } finally {
      isLoading.value = false;
    }
  }

  async function updatePassword(newPassword: string) {
    isLoading.value = true;
    try {
      await updatePasswordService(newPassword);
    } finally {
      isLoading.value = false;
    }
  }

  function getSession() {
    return getSessionService();
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
