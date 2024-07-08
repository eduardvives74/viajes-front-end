type DetallesViaje = {
  time: Number
  lat: Number
  lon: Number
  address: String
}

type BoundingBox = {
  lat: Number
  lon: Number
}

type Viaje = {
  id: String
  start: DetallesViaje
  end: DetallesViaje
  distance: Number
  duration: Number
  overspeedsCount: Number
  boundingBox: BoundingBox[]
}

type Viajes = {
  trips: Viaje[]
}

export type { Viajes, Viaje, DetallesViaje, BoundingBox }
