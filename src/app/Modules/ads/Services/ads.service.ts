import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdsResponse } from '../Interfaces/ads';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private _http:HttpClient) { }


  Getter():Observable <AdsResponse>{return this._http.get<AdsResponse>('ads')}
   CreateAds(data:any):Observable<any>{
    return this._http.post("ads",data);
  }
  EditAds( id:string,data:any):Observable<any>{
    return this._http.put(`ads/${id}`,data);
  }
   DeleteAds( id:string):Observable<any>{
    return this._http.delete(`ads/${id}`);
  }
}
