import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../Interfaces/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _http:HttpClient) { }
  getAllBooking(page: number,size: number): Observable<any> {
     return this._http.get<any>(`booking?page=${page}&size=${size}`);
  }

  bookingDetails(): Observable<Booking> {
     return this._http.get<any>(`booking/6591734ad50e86bcce294b08`);
  }

  
  Ondelete(id:string):Observable<any>
  {
    return this._http.delete(`booking/${id}`);
  }
}
