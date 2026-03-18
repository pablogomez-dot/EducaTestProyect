<template>
  <div>
    <header class="app-header">
      <div class="logo">
        <h1>Maker3D Hub</h1>
      </div>
      <nav aria-label="Navegación principal">
        <router-link to="/" class="nav-btn">Inicio</router-link>
        <router-link to="/admin" class="nav-btn" v-if="role === 'admin'">Dashboard Admin</router-link>
        <router-link to="/upload" class="nav-btn" v-if="role === 'admin' || role === 'docente'">Subir Recurso</router-link>
        <router-link to="/creator" class="nav-btn" v-if="role === 'docente'">Creator</router-link>
        <router-link to="/login" class="nav-btn" v-if="!role">Login</router-link>
        <button class="nav-btn" @click="logout" v-if="role">Cerrar Sesión</button>
      </nav>
    </header>

    <main class="container">
      <router-view @update-role="role = $event"></router-view>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const role = ref(localStorage.getItem('role') || '')
const router = useRouter()

const logout = () => {
  localStorage.removeItem('role')
  localStorage.removeItem('token')
  role.value = ''
  router.push('/login')
}
</script>
