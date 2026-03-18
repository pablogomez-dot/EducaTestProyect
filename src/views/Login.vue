<template>
  <section class="page-section" aria-labelledby="login-title">
    <div class="login-box">
      <h2 id="login-title">Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="user" class="sr-only">Usuario</label>
          <input type="text" id="user" v-model="username" placeholder="Usuario" required autocomplete="username">
        </div>
        <div class="form-group">
          <label for="pass" class="sr-only">Contraseña</label>
          <input type="password" id="pass" v-model="password" placeholder="Contraseña" required autocomplete="current-password">
        </div>
        <div class="form-group">
          <label for="role" class="sr-only">Rol de usuario</label>
          <select id="role" v-model="role" required>
            <option value="admin">Administrador (Educa360)</option>
            <option value="docente">Docente / Creador</option>
            <option value="estudiante">Estudiante</option>
          </select>
        </div>
        <button type="submit" class="primary-btn full-width">Entrar</button>
        <p :class="['feedback-msg', msgClass]">{{ msg }}</p>
      </form>
      <p style="margin-top: 1rem; text-align: center;"><router-link to="/register">Registrarse</router-link></p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const role = ref('admin')
const msg = ref('')
const msgClass = ref('')
const router = useRouter()
const emit = defineEmits(['update-role'])

const login = () => {
  if (password.value === "1234") {
    localStorage.setItem('role', role.value)
    localStorage.setItem('token', 'mock_token')
    emit('update-role', role.value)
    
    msg.value = `Bienvenido, ${username.value || 'Usuario'}.`
    msgClass.value = 'success'
    
    setTimeout(() => {
      if (role.value === 'admin') router.push('/admin')
      else if (role.value === 'docente') router.push('/upload')
      else router.push('/')
    }, 800)
  } else {
    msg.value = "Contraseña incorrecta. Pista: use '1234'."
    msgClass.value = 'error'
  }
}
</script>
