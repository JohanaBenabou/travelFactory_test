import {
  createRouter,
  createWebHistory,
} from "vue-router";

import AuthView from "../views/AuthView.vue";

import RequesterView from "../views/RequesterView.vue";

import ValidatorView from "../views/ValidatorView.vue";

import MainLayout from "../layouts/MainLayout.vue";

const routes = [

  {
    path: "/auth",
    component: AuthView,
  },

  {
    path: "/",
    component: MainLayout,

    children: [

      {
        path: "",
        component: RequesterView,
      },

      {
        path: "validator",
        component: ValidatorView,
      },

    ],
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(
  (to) => {

    const storedUser =
      localStorage.getItem(
        "user"
      );

    const user =
      storedUser &&
      storedUser !== "undefined"
        ? JSON.parse(
            storedUser
          )
        : null;

    if (
      to.path === "/"
    ) {

      return "/auth";
    }

    if (
      !user &&
      to.path !== "/auth"
    ) {

      return "/auth";
    }

    if (
      to.path === "/validator" &&
      user?.role !==
        "Validator"
    ) {

      return "/auth";
    }

    return true;
  }
);

export default router;