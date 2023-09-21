import { createRouter, createWebHistory } from 'vue-router'
import Encuesta from '../views/Encuesta.vue'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import UserEncuestas from '../views/UserEncuestas.vue'
import AdminHub from '../views/AdminHub.vue'
import CrearEncuesta from '../components/CrearEncuesta.vue';
import store from '../../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/user',
      name: 'EncuestaUser',
      component: UserEncuestas,
    },
    {
      path: '/encuesta/:idEncuesta',
      name: 'Encuesta',
      component: Encuesta,
    },
    {
      path: '/admin',
      name: 'AdminHub',
      component: AdminHub,
    },
    {
      path: '/crear-encuesta',
      name: 'CrearEncuesta',
      component: CrearEncuesta,
    }
  ],
});

const userRoutes = ['/user', '/encuesta/:idEncuesta', '/crear-encuesta'];
const adminRoutes = ['/admin'];

router.beforeEach((to, from, next) => {
  const token = store.getters.getToken;
  const isAdmin = token ? JSON.parse(atob(token.split('.')[1])).user.Admin : false;

  if (userRoutes.includes(to.path)) {
    if (token && !isAdmin) {

      next();
    } else {

      next({ name: 'Home' });
    }
  } else if (adminRoutes.includes(to.path)) {
    if (token && isAdmin) {

      next();
    } else {

      next({ name: 'Home' });
    }
  } else {

    next();
  }
});

export default router
