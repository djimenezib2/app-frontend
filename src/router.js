import { createRouter, createWebHistory } from 'vue-router';
import store from './main.js';

import TendersList from './components/TendersList';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import NotFoundPage from './components/NotFoundPage';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/licitaciones' },
    {
      path: '/licitaciones',
      component: TendersList,
      meta: { needsAuth: false },
    },
    { path: '/login', component: LoginPage, meta: { needsAuth: false } },
    { path: '/admin', component: AdminPage, meta: { needsAuth: true } },
    { path: '/notFound', component: NotFoundPage, meta: { needsAuth: false } },
    { path: '/:notFound(.*)', redirect: '/licitaciones' },
  ],
});

router.beforeEach(async function (to, from, next) {
  if (to.meta.needsAuth) {
    // check if user is admin or superadmin
    const token = localStorage.getItem('token');

    const data = { token };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      'http://127.0.0.1:3000/v1/users/checkAuth',
      requestOptions
    );
    const responseData = await response.json();
    const userRole = responseData.role;
    if (userRole === 'user') {
      // redirect
      next('/notFound');
    }
    store.state.userRole = userRole;
    next();
  } else {
    next();
  }
});

export default router;
