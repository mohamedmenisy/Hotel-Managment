export interface Booking {
  _id: string;
  startDate: string;   
  endDate: string;     
  totalPrice: number;
  user: {
    _id: string;
    userName: string;
  };
  room: {
    _id: string;
    roomNumber: string;
  };
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;   
  updatedAt: string;   
  stripeChargeId?: string; // optional
}
