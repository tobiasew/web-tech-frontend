import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView'
import About from '../views/AboutView'
import Items from '../views/Items'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/items',
    name: 'Items',
    component: Items
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router
