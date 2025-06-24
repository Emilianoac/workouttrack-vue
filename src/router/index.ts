import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/lib/supabaseClient";
import { useTopLoader } from "@/composables/useTopLoader";

import DashboardLayout from "@/layouts/DashboardLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

import HistoryIcon from "@/components/Icons/History.vue";
import HomeIcon from "@/components/Icons/Home.vue";
import RegisterWorkoutIcon from "@/components/Icons/RegisterWorkout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/Dashboard/HomeView.vue"),
          meta: {
            menu: true,
            label: "Inicio",
            shortLabel: "Inicio",
            icon: HomeIcon,
          },
        },
        {
          path: "registar-entrenamiento",
          name: "register-workout",
          component: () => import("../views/Dashboard/WorkoutFormView.vue"),
          meta: {
            menu: true,
            label: "Registrar entrenamiento",
            shortLabel: "Registrar",
            icon: RegisterWorkoutIcon,
          },
        },
        {
          path: "historial-entrenamientos",
          name: "workout-history",
          component: () => import("../views/Dashboard/WorkoutListView.vue"),
          meta: {
            menu: true,
            label: "Historial de entrenamientos",
            shortLabel: "Historial",
            icon: HistoryIcon,
          },
        },
      ],
    },
    {
      path: "/auth",
      component: AuthLayout,
      name: "auth",
      children: [
        { path: "", redirect: { path: "/" }, name: "auth-redirect" },
        {
          path: "login",
          name: "login",
          component: () => import("../views/Auth/LoginView.vue"),
          meta: {
            menu: false,
            label: "Iniciar sesión",
          },
        },
        {
          path: "registro",
          name: "register",
          component: () => import("../views/Auth/RegisterView.vue"),
          meta: {
            menu: false,
            label: "Registro",
          },
        },
        {
          path: "olvide-mi-contrasena",
          name: "forgot-password",
          component: () => import("../views/Auth/ForgotPasswordView.vue"),
          meta: {
            menu: false,
            label: "Olvidé mi contraseña",
          },
        },
        {
          path: "cambiar-contrasena",
          name: "auth-change-password",
          component: () => import("../views/Auth/ResetPasswordView.vue"),
          meta: {
            menu: false,
            label: "Cambiar contraseña",
          },
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const loader = useTopLoader();
  loader.start();
  document.title = to.meta.label ? `${to.meta.label} - WokoutTracker` : "WokoutTracker";

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !session) {
    next("/auth/login");
  } else if (to.name === "login" && session) {
    next("/");
  } else {
    next();
  }
});

router.afterEach(() => {
  const loader = useTopLoader();
  loader.finish();
});

export default router;
