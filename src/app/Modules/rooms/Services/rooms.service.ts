import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { RoomResponse } from '../interfaces/room-details';

@Injectable({
  providedIn: 'root'
})
export class RoomsService  {

  constructor(private _http:HttpClient) { }
  createRoom(data:any):Observable<any>{
    return this._http.post('admin/rooms',data);
  }
   deleterooms(id: string): Observable<any> {
    return this._http.delete(`admin/rooms/${id}`);
  }
  getAllrooms(page: number,size: number): Observable<any> {
    return this._http.get<any>(`admin/rooms?page=${page}&size=${size}`
    );
  }
  getRoomByid(id:any):Observable<RoomResponse>{
    return this._http.get<RoomResponse>(`admin/rooms/${id}`);
  }
  UpdateRoom(id:string,data:any):Observable<any>{
    return this._http.put(`admin/rooms/${id}`,data);
  }
  getrooms(): Observable<any> {
    return this._http.get<any>(`admin/rooms?page=1&size=10000000000`);
  }
}
