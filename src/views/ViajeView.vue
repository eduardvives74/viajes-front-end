<template>
  <div id="detalleViaje" class="container">
    <h1 class="titulo">
      Detalle de Viaje
      <button class="button" @click.prevent="$router.go(-1)">
        <span class="button_lg">
          <span class="button_sl"></span>
          <span class="button_text">
            <span>Volver</span>
          </span>
        </span>
      </button>
    </h1>
    <GoogleMap
      v-if="!loading"
      api-key="AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"
      style="width: 100%; height: 500px"
      :center="centroMapa"
      :zoom="18"
    >
      <Marker :options="marcadorInicio" />
      <Marker :options="marcadorFin" />
      <Polygon :options="boundingBox" />
    </GoogleMap>
  </div>
</template>

<script lang="ts" setup>
import { GoogleMap, Marker, Polygon } from 'vue3-google-map'
import axios from 'axios'
import { Ref, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const viajeID: Ref<null | string | string[]> = ref(route.params.id)
const viaje = ref(null)

const loading = ref(true)
const centroMapa = ref(null)
const marcadorInicio = ref(null)
const marcadorFin = ref(null)
const boundingBox = {
  paths: [],
  strokeColor: '#ff0000',
  strokeOpacity: 1,
  strokeWeight: 2,
  fillOpacity: 0
}

const getViajes = async () => {
  const response = await axios(
    `http://virtserver.swaggerhub.com/CONTABILIDAD/JooycarTest/1.0.0/api/trips/v1`,
    {
      method: 'GET'
    }
  )
  viaje.value = response.data.trips.filter((viaje) => {
    return viaje.id === viajeID.value
  })[0]

  centroMapa.value = { lat: viaje.value.start.lat, lng: viaje.value.start.lon }
  marcadorInicio.value = {
    position: { lat: viaje.value.start.lat, lng: viaje.value.start.lon },
    label: 'I',
    title: 'Inicio del Viaje'
  }

  marcadorFin.value = {
    position: { lat: viaje.value.end.lat, lng: viaje.value.end.lon },
    label: 'F',
    title: 'Fin del Viaje'
  }

  viaje.value.boundingBox.forEach((posicion) => {
    boundingBox.paths.push({ lat: posicion.lat, lng: posicion.lon })
  })

  loading.value = false
}
getViajes()
</script>