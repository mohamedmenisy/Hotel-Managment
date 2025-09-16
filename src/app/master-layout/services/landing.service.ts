import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private _http:HttpClient) { }
  getRooms():Observable<any>{
    return this._http.get('portal/rooms/available',{
      params:{
        page:3,
        size:5,
      }
    })
  }
}
