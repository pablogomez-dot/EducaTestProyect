import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Upload from '../views/Upload.vue'
import Creator from '../views/Creator.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/admin', component: Admin },
    { path: '/upload', component: Upload },
    { path: '/creator', component: Creator }
  ]
})

export default router
