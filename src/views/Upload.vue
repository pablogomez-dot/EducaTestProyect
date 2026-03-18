<template>
  <section class="upload-section page-section">
    <h2 id="upload-title">Subir nuevo recurso</h2>
    <div class="wizard-steps">
      <div :class="['step', { active: step === 1 }]">1. Subir Archivo</div>
      <div :class="['step', { active: step === 2 }]">2. Magia con IA</div>
      <div :class="['step', { active: step === 3 }]">3. Publicar</div>
    </div>

    <form @submit.prevent="publish" class="upload-form">
      <div v-if="step === 1" class="wizard-content">
        <div class="form-group">
          <label>Archivo del recurso</label>
          <input type="file" @change="file = $event.target.files[0]" required>
        </div>
        <div class="form-group">
          <label>Breve indicación</label>
          <input type="text" v-model="prompt" required>
        </div>
        <button type="button" class="primary-btn" @click="nextStep(2)">Siguiente</button>
      </div>

      <div v-if="step === 2" class="wizard-content">
        <div v-if="loading" class="spinner"></div>
        <div v-else>
          <div class="form-group">
            <label>Título Generado</label>
            <input type="text" v-model="generated.title" required>
          </div>
          <div class="wizard-actions">
            <button type="button" class="nav-btn" @click="step = 1">Volver</button>
            <button type="button" class="primary-btn" @click="nextStep(3)">Siguiente</button>
          </div>
        </div>
      </div>

      <div v-if="step === 3" class="wizard-content">
        <p>Revisa y publica.</p>
        <div class="wizard-actions">
          <button type="button" class="nav-btn" @click="step = 2">Volver</button>
          <button type="submit" class="primary-btn success-btn">Publicar Recurso</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const step = ref(1)
const file = ref(null)
const prompt = ref('')
const loading = ref(false)
const generated = ref({ title: '' })

const nextStep = (s) => {
  step.value = s
  if (s === 2) {
    loading.value = true
    setTimeout(() => {
      generated.value.title = "Recurso Generado con IA"
      loading.value = false
    }, 1000)
  }
}

const publish = () => {
  alert('Publicado: ' + generated.value.title)
  step.value = 1
}
</script>
