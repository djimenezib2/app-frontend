import { createRouter, createWebHistory } from "vue-router";
import store from "./main.js";

import TendersList from "./components/TendersList";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import AdminPage from "./components/AdminPage";
import NotFoundPage from "./components/NotFoundPage";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    {
      path: "/licitaciones",
      component: TendersList,
      meta: { needsAuth: false },
    },
    { path: "/login", component: LoginPage, meta: { needsAuth: false } },
    { path: "/signup", component: SignUpPage, meta: { needsAuth: false } },
    { path: "/admin", component: AdminPage, meta: { needsAuth: true } },
    { path: "/notFound", component: NotFoundPage, meta: { needsAuth: false } },
    { path: "/:notFound(.*)", redirect: "/notFound" },
  ],
});

router.beforeEach(async function (to, from, next) {
  if (to.meta.needsAuth) {
    // check if user is admin or superadmin
    const token = localStorage.getItem("token");

    const data = { token };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      "http://127.0.0.1:3000/v1/users/checkAuth",
      requestOptions
    );
    const responseData = await response.json();
    const userRole = responseData.role;
    console.log(responseData);
    if (userRole === "user" || responseData.error) {
      // redirect
      next("/notFound");
    }
    store.state.userRole = userRole;
    next();
  } else {
    next();
  }
});

export default router;
