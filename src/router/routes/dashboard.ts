import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { type RouteRecordRaw } from "vue-router";

import routinesRoutes from "@/router/routes/routines";
import workoutsRoutes from "@/router/routes/workouts";

import HomeIcon from "@/components/Icons/Home.vue";

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
      ...workoutsRoutes,
    ],
  },
] as RouteRecordRaw[];
