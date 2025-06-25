import { type RouteRecordRaw } from "vue-router";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

import HistoryIcon from "@/components/Icons/History.vue";
import HomeIcon from "@/components/Icons/Home.vue";
import RegisterWorkoutIcon from "@/components/Icons/RegisterWorkout.vue";
import DumbbellIcon from "@/components/Icons/Dumbbell.vue";

export default [
  {
    path: "/",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../../views/Dashboard/HomeView.vue"),
        meta: {
          menu: true,
          label: "Inicio",
          shortLabel: "Inicio",
          icon: HomeIcon,
        },
      },
      {
        path: "mis-rutinas",
        name: "my-routines",
        meta: {
          menu: true,
          label: "Mis Rutinas",
          shortLabel: "Rutinas",
          icon: DumbbellIcon,
        },
        component: () => import("../../views/Dashboard/Routines/RoutinesListView.vue"),
      },

      {
        path: "mis-rutinas/:id",
        name: "my-routine",
        component: () => import("../../views/Dashboard/Routines/RoutineView.vue"),
        meta: {
          menu: false,
          label: "Rutina",
          shortLabel: "Rutina",
          icon: DumbbellIcon,
        },
      },
      {
        path: "registar-entrenamiento",
        name: "register-workout",
        component: () => import("../../views/Dashboard/WorkoutFormView.vue"),
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
        component: () => import("../../views/Dashboard/WorkoutListView.vue"),
        meta: {
          menu: true,
          label: "Historial de entrenamientos",
          shortLabel: "Historial",
          icon: HistoryIcon,
        },
      },
    ],
  },
] as RouteRecordRaw[];
