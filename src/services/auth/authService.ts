import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export async function getSessionService(): Promise<User | null> {
  const { data, error } = await supabase.auth.getSession();

  if (error) throw new Error(`Failed to get session: ${error.message}`);

  return data.session?.user ?? null;
}

export function onAuthStateChangeService(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null); // ✅ no retorna nada, solo ejecuta callback
  });
}

export async function signInWithEmailService(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw new Error(`Failed to sign in: ${error.message}`);

  return data;
}

export async function signUpWithEmailService(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw new Error(`Failed to sign up: ${error.message}`);

  return data;
}

export async function signOutService() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(`Failed to sign out: ${error.message}`);
}

export async function exchangeCodeForSessionService(url: string) {
  const { error } = await supabase.auth.exchangeCodeForSession(url);

  if (error) throw new Error(`Failed to exchange code for session: ${error.message}`);
}

export async function sendResetPasswordEmailService(email: string, url?: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: url || `${window.location.origin}/auth/reset-password`,
  });

  if (error) throw new Error(`Failed to send reset password email: ${error.message}`);
}

export async function updatePasswordService(newPassword: string) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) throw new Error(`Failed to update password: ${error.message}`);
}
