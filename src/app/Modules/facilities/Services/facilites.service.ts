
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFacilitiesData, IApiResponse } from './../interfaces/IFacility';
import { Facilties } from '../interfaces/facilties';
@Injectable({
  providedIn: 'root',
})
export class FacilitesService {

  constructor(private _HttpClient:HttpClient) { }
    Creator(data: any): Observable<Facilties> {
    return this._HttpClient.post<Facilties>("room-facilities", data);
  }

  Editor(id: number, data: any): Observable<Facilties> {
    return this._HttpClient.put<Facilties>(`room-facilities/${id}`, data);
  }

    deletefacilities(id: string): Observable<any> {
    return this._HttpClient.delete(`room-facilities/${id}`);
  }

  getAllFacilites(
    page: number,
    size: number
  ): Observable<IApiResponse<IFacilitiesData>> {
    return this._HttpClient.get<IApiResponse<IFacilitiesData>>(
      `room-facilities?page=${page}&size=${size}`
    );
  }
}
