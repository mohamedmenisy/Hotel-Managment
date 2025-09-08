import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private _http:HttpClient) { }
  createRoom(data:any):Observable<any>{
    return this._http.post('rooms',data);
  }
}
