<template>
  <section id="home" class="page-section" aria-labelledby="home-title">
    <h2 id="home-title">Explorar recursos</h2>

    <form class="search-bar" @submit.prevent="applyFilters" aria-label="Búsqueda de recursos">
      <label for="searchInput" class="sr-only">Buscar recursos</label>
      <input type="search" id="searchInput" v-model="searchQuery" placeholder="Buscar recursos..." required>
      <button type="submit" class="primary-btn">Buscar</button>
    </form>

    <div class="filters">
      <label for="resourceFilter" class="sr-only">Filtrar por tipo</label>
      <select id="resourceFilter" v-model="selectedType" @change="applyFilters" aria-label="Filtrar por tipo de recurso">
        <option value="all">Todas las categorías</option>
        <option value="modelo">Modelo 3D</option>
        <option value="redes">Redes Locales</option>
        <option value="pc">Laboratorio de PC</option>
        <option value="script">Script</option>
        <option value="actividad">Actividad</option>
      </select>
    </div>

    <div class="resources">
      <article v-for="res in filteredResources" :key="res.id" class="card" :data-type="res.type">
        <h3>{{ res.title }}</h3>
        <p>{{ res.desc }}</p>
        <div class="tags">
          <span v-for="tag in res.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <button class="view-resource-btn">Ver recurso</button>
      </article>
      <p v-if="filteredResources.length === 0">No se encontraron recursos.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const resources = ref([
  { id: 1, title: "Motor eléctrico", desc: "Modelo 3D interactivo para simulación.", type: "modelo", tags: ["3D", "física"] },
  { id: 2, title: "Sensor de temperatura", desc: "Script C# para integración.", type: "script", tags: ["C#", "Unity"] },
  { id: 3, title: "Circuitos básicos", desc: "Actividad educativa.", type: "actividad", tags: ["electrónica"] },
])

const filteredResources = ref([...resources.value])
const searchQuery = ref('')
const selectedType = ref('all')

const applyFilters = () => {
  const query = searchQuery.value.toLowerCase().trim()
  filteredResources.value = resources.value.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(query) || res.desc.toLowerCase().includes(query)
    const matchesType = selectedType.value === 'all' || res.type === selectedType.value
    return matchesSearch && matchesType
  })
}
</script>
