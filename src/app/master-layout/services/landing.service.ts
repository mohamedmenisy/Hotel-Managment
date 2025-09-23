import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private _http:HttpClient) { }

  gitallroomsexplore(page: number,size: number,date:any):Observable<any>{
    let prams:any={
        page:page,
        size:size,
    }
    if(date !=null){
      prams.startDate= new Date(date.start).toISOString().split('T')[0];
      prams.endDate= new Date(date.end).toISOString().split('T')[0];
    }
    return this._http.get(`portal/rooms/available`,{
      params:prams
    })
  }
  getRooms():Observable<any>{
    return this._http.get<any>('portal/rooms/available',{
      params:{
        page:1,
        size:100000000000000,
      }
    })
  }
}
