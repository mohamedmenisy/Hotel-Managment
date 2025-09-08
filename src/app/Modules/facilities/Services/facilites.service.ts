import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IFacilitiesData } from '../Interfaces/IFacility';

@Injectable({
  providedIn: 'root',
})
export class FacilitesService {

  constructor(private _HttpClient:HttpClient) { }
    deletefacilities(id: number): Observable<any> {
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
