import { type RouteRecordRaw } from "vue-router";

import HistoryIcon from "@/components/Icons/History.vue";
import RegisterWorkoutIcon from "@/components/Icons/RegisterWorkout.vue";

export default [
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
] as RouteRecordRaw[];
