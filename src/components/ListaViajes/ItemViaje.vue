<template>
  <div v-if="!errorPage" class="item-viaje">
    <div class="inicio">
      <span class="fecha-inicio"> {{ fechaInicioString }}</span>
      <span class="direccion direccion-inicio">{{ viaje.start.address }}</span>
    </div>
    <div class="fin">
      <span class="fecha-fin">{{ fechaFinString }}</span>
      <span class="direccion direccion-fin">{{ viaje.end.address }}</span>
    </div>
    <div class="vuelo">
      <span class="tiempo-viaje">{{ tiempoTranscurrido }}</span>
      <span class="distancia-viaje">{{ distanciaVuelo }} Km</span>
    </div>
    <div class="link">
      <router-link :to="{ name: 'viaje', params: { id: viaje.id } }" class="button">
        <span class="button_lg">
          <span class="button_sl"></span>
          <span class="button_text">
            <span>Detalle</span>
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"
              />
            </svg>
          </span>
        </span>
      </router-link>
    </div>
  </div>
  <div v-else>
    <div class="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'https://maps.googleapis.com/maps/api/js?v=3&libraries=geometry'
import { Ref, ref } from 'vue'

const props = defineProps({
  viaje: {
    type: Object || null,
    default: null
  }
})

const errorPage = ref(false)
const errorMessage = ref('')

// Obtener fechaas y formatear segun lenguaje del usuario
const fechaInicio: Date = new Date(props.viaje.start.time)
const fechaFin: Date = new Date(props.viaje.end.time)

const fechaInicioString: String = fechaInicio.toLocaleString(
  navigator.userLanguage ||
    (navigator.languages && navigator.languages.length && navigator.languages[0]) ||
    navigator.language ||
    navigator.browserLanguage ||
    navigator.systemLanguage ||
    'es'
)
const fechaFinString: String = fechaFin.toLocaleString(
  navigator.userLanguage ||
    (navigator.languages && navigator.languages.length && navigator.languages[0]) ||
    navigator.language ||
    navigator.browserLanguage ||
    navigator.systemLanguage ||
    'es'
)

// Calculo de distancias
const puntoInicio = new google.maps.LatLng(props.viaje.start.lat, props.viaje.start.lon)
const puntoFin = new google.maps.LatLng(props.viaje.end.lat, props.viaje.end.lon)
const distanciaVuelo = (
  google.maps.geometry.spherical.computeDistanceBetween(puntoInicio, puntoFin) / 1000
).toFixed(2)

// Calculo de tiempo de vieaje
const obtenerTiempo = (startDate, endDate) => {
  const seconds = Math.floor((endDate - startDate) / 1000)
  const minutes = Math.floor(seconds / 60)
  return `${minutes} Min.`
}

const tiempoTranscurrido: any = obtenerTiempo(props.viaje.start.time, props.viaje.end.time)
</script>