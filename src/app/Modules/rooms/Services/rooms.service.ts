import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService  {

  constructor(private _http:HttpClient) { }
  createRoom(data:any):Observable<any>{
    return this._http.post('rooms',data);
  }
   deleterooms(id: string): Observable<any> {
    return this._http.delete(`rooms/${id}`);
  }
  getAllrooms(page: number,size: number): Observable<any> {
    return this._http.get<any>(`rooms?page=${page}&size=${size}`
    );
  }
  getRoomByid(id:string):Observable<any>{
    return this._http.get(`rooms/${id}`);
  }
  UpdateRoom(id:string,data:any):Observable<any>{
    return this._http.put(`rooms/${id}`,data);
  }
  getrooms(): Observable<any> {
    return this._http.get<any>(`rooms?page=1&size=10000000000`);
  }
}
