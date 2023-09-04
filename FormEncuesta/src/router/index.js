import { createRouter, createWebHistory } from 'vue-router'
import Encuesta from '../views/Encuesta.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/encuesta',
      name: 'Encuesta',
      component: Encuesta,
    },
  ]
})

export default router
