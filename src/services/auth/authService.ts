import { supabase } from "@/lib/supabaseClient";
import { mapAuthError } from "@/services/auth/errors/mapAuthError";
import { getAuthErrorMessage } from "@/services/auth/errors/authMessages";
import type { User } from "@supabase/supabase-js";

export async function getSessionService(): Promise<User | null> {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    const code = mapAuthError(error);
    const message = getAuthErrorMessage(code);
    console.error("Error getting session:", message);
    throw new Error(message);
  }

  return data.session?.user ?? null;
}

export function onAuthStateChangeService(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null); // ✅ no retorna nada, solo ejecuta callback
  });
}

export async function signInWithEmailService(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    const code = mapAuthError(error);
    const message = getAuthErrorMessage(code);
    console.error("Error signing in:", message);
    throw new Error(message);
  }

  return data;
}

export async function signUpWithEmailService(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    const code = mapAuthError(error);
    const message = getAuthErrorMessage(code);
    console.error("Error signing up:", message);
    throw new Error(message);
  }

  return data;
}

export async function signOutService() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    const code = mapAuthError(error);
    const message = getAuthErrorMessage(code);
    console.error("Error signing out:", message);
    throw new Error(message);
  }
}

export async function exchangeCodeForSessionService(url: string) {
  const { error } = await supabase.auth.exchangeCodeForSession(url);

  if (error) {
    const code = mapAuthError(error);
    const message = getAuthErrorMessage(code);
    console.error("Error exchanging code for session:", message);
    throw new Error(message);
  }
}

export async function sendResetPasswordEmailService(email: string, url?: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: url || `${window.location.origin}/auth/reset-password`,
  });

  if (error) {
    const code = mapAuthError(error);
    const message = getAuthErrorMessage(code);
    console.error("Error sending reset password email:", message);
    throw new Error(message);
  }
}

export async function updatePasswordService(newPassword: string) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    const code = mapAuthError(error);
    const message = getAuthErrorMessage(code);
    console.error("Error updating password:", message);
    throw new Error(message);
  }
}
