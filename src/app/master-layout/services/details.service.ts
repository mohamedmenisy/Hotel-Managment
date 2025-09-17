import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoomResponse } from '../../Modules/rooms/interfaces/room-details';


@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http :HttpClient) { }


Detailed(id: string): Observable<RoomResponse> {
  return this.http.get<RoomResponse>(`portal/rooms/${id}`);
}

CreateComment(data:any):Observable<any>{
 return this.http.post('portal/room-comments',data);
}

RateRoom(data:any):Observable<any>{
 return this.http.post('portal/room-reviews',data);
}



}
