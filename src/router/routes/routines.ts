import { type RouteRecordRaw } from "vue-router";

import DumbbellIcon from "@/components/Icons/Dumbbell.vue";

export default [
  {
    path: "mis-rutinas",
    name: "my-routines",
    meta: {
      menu: true,
      order: 2,
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
    path: "mis-rutinas/crear",
    name: "create-routine",
    component: () => import("../../views/Dashboard/Routines/CreateRoutineView.vue"),
    meta: {
      menu: false,
      label: "Crear Rutina",
      shortLabel: "Crear",
      icon: DumbbellIcon,
    },
  },

  {
    path: "mis-rutinas/:id/editar",
    name: "edit-routine",
    component: () => import("../../views/Dashboard/Routines/EditRoutineView.vue"),
    meta: {
      menu: false,
      label: "Editar Rutina",
      shortLabel: "Editar",
      icon: DumbbellIcon,
    },
  },
] as RouteRecordRaw[];
