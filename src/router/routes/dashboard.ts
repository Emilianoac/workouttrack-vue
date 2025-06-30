import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { type RouteRecordRaw } from "vue-router";

import routinesRoutes from "@/router/routes/routines";

import HistoryIcon from "@/components/Icons/History.vue";
import HomeIcon from "@/components/Icons/Home.vue";
import RegisterWorkoutIcon from "@/components/Icons/RegisterWorkout.vue";

export default [
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../../views/Dashboard/HomeView.vue"),
        meta: {
          menu: true,
          order: 1,
          label: "Inicio",
          shortLabel: "Inicio",
          icon: HomeIcon,
        },
      },
      ...routinesRoutes,
      {
        path: "registar-entrenamiento",
        name: "register-workout",
        component: () => import("../../views/Dashboard/Workouts/RegisterWorkoutView.vue"),
        meta: {
          menu: true,
          order: 3,
          label: "Registrar entrenamiento",
          shortLabel: "Registrar",
          icon: RegisterWorkoutIcon,
        },
      },
      {
        path: "historial-entrenamientos",
        name: "workout-history",
        component: () => import("../../views/Dashboard/Workouts/WorkoutsHistoryView.vue"),
        meta: {
          menu: true,
          order: 4,
          label: "Historial de entrenamientos",
          shortLabel: "Historial",
          icon: HistoryIcon,
        },
      },
    ],
  },
] as RouteRecordRaw[];
