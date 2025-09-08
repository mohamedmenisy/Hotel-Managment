import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService  {

  constructor(private _http:HttpClient) { }
  createRoom(data:any):Observable<any>{
    return this._http.post('rooms',data);
  }
}
  constructor(private _HttpClient:HttpClient) { }
    CreateFacility(data: any): Observable<any> {
    return this._HttpClient.post("room-facilities", data);
  }



    deleterooms(id: string): Observable<any> {
    return this._HttpClient.delete(`rooms/${id}`);
  }

  getAllrooms(
    page: number,
    size: number
  ): Observable<any> {
    return this._HttpClient.get<any>(
      `rooms?page=${page}&size=${size}`
    );
  }
}
