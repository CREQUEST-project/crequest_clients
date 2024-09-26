import { createRouter, createWebHistory } from "vue-router";
import { isLoggedIn, isBiologist } from "./../stores/authStore";
import { useToast } from "vue-toastification";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./../views/Home.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("./../views/Signup.vue"),
    meta: { requiresNotAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("./../views/Login.vue"),
    meta: { requiresNotAuth: true },
  },
  {
    path: "/search-for-cre",
    name: "SearchForCre",
    component: () => import("./../views/SearchForCare.vue"),
  },
  {
    path: "/results",
    name: "SearchForCreResults",
    component: () => import("./../views/SearchForCareResult.vue"),
  },
  {
    path: "/query-cre",
    name: "QueryCre",
    component: () => import("./../views/QueryCare.vue"),
  },
  {
    path: "/motif-sampler",
    name: "MotifSampler",
    component: () => import("./../views/MotifSampler.vue"),
  },
  {
    path: "/motif-details/:id",
    name: "MotifDetails",
    component: () => import("./../views/MotifDetails.vue"),
  },
  {
    path: "/history",
    name: "History",
    component: () => import("./../views/History.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/history/:id",
    name: "HistoryDetails",
    component: () => import("./../views/ViewHistory.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("./../views/About.vue"),
  },
  {
    path: "/biologist",
    name: "Biologist",
    component: () => import("./../views/Biologist.vue"),
    meta: { requiresAuth: true, requiresBiologist: true },
  },
  {
    path: "/help",
    name: "Help",
    component: () => import("./../views/Help.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("./../views/Profile.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (to.matched.some((record) => record.meta.requiresNotAuth)) {
    if (isLoggedIn.value) {
      next({ name: "Home" });
    } else {
      next();
    }
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn.value) {
      next({ name: "Login" });
    } else if (to.matched.some((record) => record.meta.requiresBiologist)) {
      if (!isBiologist.value) {
        const toast = useToast();
        toast.error("You do not have permission to access this page");
        next({ name: "Home" });
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
