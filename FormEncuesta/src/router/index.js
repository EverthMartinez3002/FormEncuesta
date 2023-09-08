import { createRouter, createWebHistory } from 'vue-router'
import Encuesta from '../views/Encuesta.vue'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import UserEncuestas from '../views/UserEncuestas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/encuesta',
      name: 'Encuesta',
      component: Encuesta,
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
      component: UserEncuestas
    }
  ],
});

export default router
