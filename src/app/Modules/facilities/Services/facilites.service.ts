import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFacilitiesData, IApiResponse ,IFaciltyModal } from './../Interfaces/IFacility';

@Injectable({
  providedIn: 'root',
})
export class FacilitesService {

  constructor(private _HttpClient:HttpClient) { }
    CreateFacility(data: any): Observable<IFaciltyModal> {
    return this._HttpClient.post<IFaciltyModal>("admin/room-facilities", data);
  }

  EditFacility(id: string, data: any): Observable<IFaciltyModal> {
    return this._HttpClient.put<IFaciltyModal>(`admin/room-facilities/${id}`, data);
  }

    deletefacilities(id: string): Observable<any> {
    return this._HttpClient.delete(`admin/room-facilities/${id}`);
  }

  getAllFacilites(page: number,size: number): Observable<IApiResponse<IFacilitiesData>> {
    return this._HttpClient.get<IApiResponse<IFacilitiesData>>(
      `admin/room-facilities?page=${page}&size=${size}`
    );
  }
}
