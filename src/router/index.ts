import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useTopLoader } from "@/composables/useTopLoader";

import HistoryIcon from "@/components/Icons/History.vue";
import HomeIcon from "@/components/Icons/Home.vue";
import RegisterWorkoutIcon from "@/components/Icons/RegisterWorkout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        menu: true,
        label: "Inicio",
        icon: HomeIcon,
      },
    },
    {
      path: "/registrar-entrenamiento",
      name: "register-workout",
      component: () => import("../views/WorkoutFormView.vue"),
      meta: {
        menu: true,
        label: "Registrar Entrenamiento",
        icon: RegisterWorkoutIcon,
      },
    },
    {
      path: "/historial-entrenamientos",
      name: "workout-history",
      component: () => import("../views/WorkoutListView.vue"),
      meta: {
        menu: true,
        label: "Historial de Entrenamientos",
        icon: HistoryIcon,
      },
    },
  ],
});

router.beforeEach((to) => {
  const loader = useTopLoader();
  loader.start();
  document.title = to.meta.label ? `${to.meta.label} - Entrenador personal` : "Entrenador personal";
});

router.afterEach(() => {
  const loader = useTopLoader();
  loader.finish();
});

export default router;
