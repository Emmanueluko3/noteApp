import { createRouter, createWebHistory } from "vue-router";
import NoteApp from "../views/Notes.vue";
import errorPage from "../views/errorPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: NoteApp,
    },
    {
      path: "/error",
      name: "error",
      component: errorPage,
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/error",
    },
  ],
});

export default router;
