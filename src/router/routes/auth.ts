import { type RouteRecordRaw } from "vue-router";

import AuthLayout from "@/layouts/AuthLayout.vue";
import LoginView from "@/views/Auth/LoginView.vue";
import RegisterView from "@/views/Auth/RegisterView.vue";
import ResetPaswordView from "@/views/Auth/ResetPasswordView.vue";

export default [
  {
    path: "/auth",
    component: AuthLayout,
    name: "auth",
    children: [
      { path: "", redirect: { path: "/" }, name: "auth-redirect" },
      {
        path: "login",
        name: "login",
        component: LoginView,
        meta: {
          menu: false,
          label: "Iniciar sesión",
        },
      },
      {
        path: "registro",
        name: "register",
        component: RegisterView,
        meta: {
          menu: false,
          label: "Registro",
        },
      },
      {
        path: "olvide-mi-contrasena",
        name: "forgot-password",
        component: () => import("../../views/Auth/ForgotPasswordView.vue"),
        meta: {
          menu: false,
          label: "Olvidé mi contraseña",
        },
      },
      {
        path: "cambiar-contrasena",
        name: "change-password",
        component: ResetPaswordView,
        meta: {
          menu: false,
          label: "Cambiar contraseña",
        },
      },
    ],
  },
] as RouteRecordRaw[];
