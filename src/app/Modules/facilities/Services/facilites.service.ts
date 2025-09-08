import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse, IFacilitiesData} from '../Interfaces/IFacility';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacilitesService {
  constructor(private _HttpClient: HttpClient) {}

  getAllFacilites(
    page: number,
    size: number
  ): Observable<IApiResponse<IFacilitiesData>> {
    return this._HttpClient.get<IApiResponse<IFacilitiesData>>(
      `room-facilities?page=${page}&size=${size}`
    );
  }
}
