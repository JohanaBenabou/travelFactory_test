import { createRouter, createWebHistory } from "vue-router";

import RequesterView from "../views/RequesterView.vue";
import ValidatorView from "../views/ValidatorView.vue";

const routes = [
  {
    path: "/",
    component: RequesterView,
  },
  {
    path: "/validator",
    component: ValidatorView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;