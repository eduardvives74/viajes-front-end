import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ItemViaje from '../ListaViajes/ItemViaje.vue'

describe('ItemViaje', () => {
  const wrapper = mount(ItemViaje, {
    props: {
      viaje: {
        id: '5efc0d7da7076973f1515120',
        start: {
          time: 1642539928000,
          lat: -33.580158,
          lon: -70.567227,
          address: 'Avenida Apoquindo 291'
        },
        end: {
          time: 1642541428000,
          lat: -33.580462,
          lon: -70.567177,
          address: 'Avenida Grecia 1043'
        },
        distance: 10.4,
        duration: 1500000,
        overspeedsCount: 2,
        boundingBox: [
          {
            lat: -33.580462,
            lon: -70.567177
          },
          {
            lat: -33.580432,
            lon: -70.567147
          },
          {
            lat: -33.580432,
            lon: -70.567147
          },
          {
            lat: -33.580433,
            lon: -70.567144
          }
        ]
      }
    }
  })

  it('Direccones son Correctas', () => {
    const direccionInicio = wrapper.find('.direccion-inicio')
    const direccionFin = wrapper.find('.direccion-inicio')
    expect(direccionInicio).toContain('Avenida Apoquindo 291')
    expect(direccionFin).toContain('Avenida Grecia 1043')
  })

  it('Fechas son Correctas', () => {
    const fechaInicio = wrapper.find('.fecha-inicio')
    const fechaFin = wrapper.find('.fecha-fin')
    expect(fechaInicio).toContain('18/1/2022, 4:05:28 p.m.')
    expect(fechaFin).toContain('18/1/2022, 4:30:28 p.m.')
  })
  it('Tiempo de viajes es Correctas', () => {
    const tiempoViaje = wrapper.find('.tiempo-viaje')
    expect(tiempoViaje).toContain('25 Min.')
  })
  it('Distancia es Correctas', () => {
    const distanciaViaje = wrapper.find('.distancia-viaje')
    expect(distanciaViaje).toContain('0.03 Km')
  })
})
