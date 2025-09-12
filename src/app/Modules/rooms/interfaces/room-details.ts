export interface RoomResponse {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  room: Room
}

export interface Room {
  _id: string
  roomNumber: string
  price: number
  capacity: number
  discount: number
  facilities: Facility[]
  createdBy: CreatedBy
  images: string[]
  createdAt: string
  updatedAt: string
}

export interface Facility {
  _id: string
  name: string
}

export interface CreatedBy {
  _id: string
  userName: string
}