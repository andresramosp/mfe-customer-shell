import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { msalInstance } from "../authConfig";
import CatalogView from "../views/CatalogView.vue";
import CustomerView from "../views/CustomerView.vue";
import HomeView from "../views/ShellView.vue";
import { registerGuard } from "./Guard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/Customer",
    name: "Customer",
    component: CustomerView,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/Catalog",
    name: "Catalog",
    component: CatalogView,
    meta: {
      requiresAuth: true
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

registerGuard(router, msalInstance);

export default router;
