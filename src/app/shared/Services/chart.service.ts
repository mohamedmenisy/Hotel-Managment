import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface ApiResponse {
  success: boolean;
  message: string;
  data: chart;
}
export interface chart {
  rooms: number
  facilities: number
  bookings: Bookings
  ads: number
  users: IUsers
}

export interface Bookings {
  pending: number
  completed: number
}

export interface IUsers {
  user: number
  admin: number
}
@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private _http:HttpClient) { }

  getChartData():Observable<ApiResponse>{
    return this._http.get<ApiResponse>('dashboard');
  }
}
