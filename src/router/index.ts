import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/lib/supabaseClient";
import { useTopLoader } from "@/composables/useTopLoader";

import authRoutes from "./routes/auth";
import dashboardRoutes from "./routes/dashboard";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    ...dashboardRoutes,
    ...authRoutes,
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
    next("/dashboard");
  } else if (to.name === "register" && session) {
    next("/dashboard");
  } else {
    next();
  }
});

router.afterEach(() => {
  const loader = useTopLoader();
  loader.finish();
});

export default router;
