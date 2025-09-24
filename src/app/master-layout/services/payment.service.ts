import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _http:HttpClient) { }
  BookRoom(data:any):Observable<any>
  {
    return this._http.post('portal/booking',data);
  }
  getBookDetails(id:string):Observable<any>
  {
    return this._http.get(`portal/booking/${id}`);
  }
  payBooking(id:string, token:any):Observable<any>
  {
    return this._http.post(`portal/booking/${id}/pay`,token);
  }

}
