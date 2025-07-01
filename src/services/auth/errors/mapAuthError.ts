import type { AuthErrorCode } from "./authCodes";

export function mapAuthError(err: unknown): AuthErrorCode {
  if (typeof err === "object" && err !== null && "code" in err) {
    const code = (err as { code: string }).code;

    console.log("Supabase error code:", code);

    if (code === "invalid_credentials") return "INVALID_CREDENTIALS";
    if (code === "user_already_registered") return "EMAIL_ALREADY_REGISTERED";
    if (code === "weak_password") return "WEAK_PASSWORD";
    if (code === "unknown_error") return "UNKNOW";
  }

  return "UNKNOW";
}
