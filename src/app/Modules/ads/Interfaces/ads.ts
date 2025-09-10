export interface AdsResponse {
  success: boolean;
  message: string;
  data: {
    ads: Ad[];
    totalCount: number;
  };
}

export interface Ad {
  _id: string;
  isActive: boolean;
  room: Room;
  createdBy: User;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  category?: string;
  facilities: string[];
  createdBy: string; // user id
  images: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface User {
  _id: string;
  userName: string;
}
