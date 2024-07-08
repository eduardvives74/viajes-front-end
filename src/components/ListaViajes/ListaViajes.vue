<template>
  <div id="listaViajes" class="container">
    <h1>Lista de Viajes</h1>
    <div class="filtros">
      <h3>Filtrar:</h3>
      <input type="text" placeholder="Inicio" v-model="filtroIncio" />
      <input type="text" placeholder="Fin" v-model="filtroFin" />
      <button class="button" @click.prevent="limpiarFiltros()">
        <span class="button_lg">
          <span class="button_sl"></span>
          <span class="button_text">
            <span>Borrar Filtros</span>
          </span>
        </span>
      </button>
    </div>
    <div
      v-if="
        viajes_filtrados !== undefined && viajes_filtrados !== null && viajes_filtrados.length > 0
      "
      class="lista-container"
    >
      <div class="header">
        <div class="inicio">Incio</div>
        <div class="fin">Fin</div>
        <div class="vuelo">Detalles del Viaje</div>
        <div class="link"></div>
      </div>
      <ItemViaje v-for="viaje in viajes_filtrados" :key="viaje.id" :viaje="viaje" />
    </div>
    <div v-else>
      <p>No se ha encontrado ningun viaje.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { computed, ref } from 'vue'

import ItemViaje from './ItemViaje.vue'

const viajes = ref(null)
const filtroIncio = ref('')
const filtroFin = ref('')

const getViajes = async () => {
  const response = await axios(
    `http://virtserver.swaggerhub.com/CONTABILIDAD/JooycarTest/1.0.0/api/trips/v1`,
    {
      method: 'GET'
    }
  )
  viajes.value = response.data
}
getViajes()

const viajes_filtrados = computed(() => {
  return viajes.value !== null
    ? viajes.value.trips.filter((viaje) => {
        return (
          viaje.start.address.toLowerCase().includes(filtroIncio.value.toLowerCase()) === true &&
          viaje.end.address.toLowerCase().includes(filtroFin.value.toLowerCase()) === true
        )
      })
    : null
})

const limpiarFiltros = () => {
  filtroIncio.value = ''
  filtroFin.value = ''
}
</script>

<style lang="scss" scoped>
.filtros {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;
  h3 {
    margin-bottom: -0.75rem;
    width: 100%;
  }
  input {
    padding: 0 1.25rem;
    height: 38px;
    font-size: 16px;
    &::placeholder {
      font-size: 16px;
      color: #10439f;
    }
  }
}
</style>