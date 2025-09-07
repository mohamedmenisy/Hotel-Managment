import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facilties } from '../Interfaces/facilties';

@Injectable({
  providedIn: 'root'
})
export class FacilitesService {

  constructor(private _http: HttpClient) { }

  Creator(data: any): Observable<Facilties> {
    return this._http.post<Facilties>("room-facilities", data);
  }

  Editor(id: number, data: any): Observable<Facilties> {
    return this._http.put<Facilties>(`room-facilities/${id}`, data);
  }

}
