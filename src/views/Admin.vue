<template>
  <section class="page-section" aria-labelledby="admin-title">
    <h2 id="admin-title">Dashboard del Administrador</h2>
    <p>Desde aquí puedes moderar los recursos publicados y gestionar los permisos de los usuarios.</p>
    
    <div class="admin-grid">
      <div class="card admin-card">
        <h3>👥 Gestión de Usuarios</h3>
        <p>Administra roles y accesos (Administrador, Docente, Estudiante).</p>
        <button class="primary-btn" @click="fetchUsers">Gestionar Permisos</button>
      </div>
      <div class="card admin-card">
        <h3>🛡️ Moderación de Contenido</h3>
        <p>Revisa y aprueba recursos subidos por Docentes antes de que sean públicos.</p>
        <button class="primary-btn">Revisar Pendientes</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import axios from 'axios'

const fetchUsers = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/users')
    console.log(res.data)
  } catch (err) {
    console.error('Error al obtener usuarios', err)
  }
}

const updateRole = async (userId, newRole) => {
  try {
    const token = localStorage.getItem('token')
    await axios.put(`http://localhost:5000/api/users/${userId}`, { role: newRole }, {
      headers: { 'x-auth-token': token }
    })
    fetchUsers()
  } catch (err) {
    console.error('Error al actualizar rol')
  }
}

const deleteUser = async (userId) => {
  if (confirm('¿Estás seguro?')) {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { 'x-auth-token': token }
      })
      fetchUsers()
    } catch (err) {
      console.error('Error al eliminar usuario')
    }
  }
}

onMounted(() => {
  // fetchUsers() // Commented out to prevent errors if backend is not running
})
</script>
