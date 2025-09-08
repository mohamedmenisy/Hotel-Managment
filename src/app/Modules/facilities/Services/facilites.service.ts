import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacilitesService {

  constructor(private _HttpClient:HttpClient) { }
    deletefacilities(id: number): Observable<any> {
    return this._HttpClient.delete(`room-facilities/${id}`);
  }


}
