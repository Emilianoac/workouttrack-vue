import type { AuthErrorCode } from "./authCodes";

export function getAuthErrorMessage(code: AuthErrorCode): string {
  switch (code) {
    case "INVALID_CREDENTIALS":
      return "Credenciales inválidas.";
    case "EMAIL_ALREADY_REGISTERED":
      return "Este correo ya está registrado.";
    case "WEAK_PASSWORD":
      return "La contraseña es demasiado débil. Por favor, elige una contraseña más segura.";
    default:
      return "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde.";
  }
}
