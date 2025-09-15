import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _http:HttpClient) { }
  getAllBooking(page: number,size: number): Observable<any> {
     return this._http.get<any>(`admin/booking?page=${page}&size=${size}`);
  }
  Ondelete(id:string):Observable<any>
  {
    return this._http.delete(`admin/booking/${id}`);
  }
}
