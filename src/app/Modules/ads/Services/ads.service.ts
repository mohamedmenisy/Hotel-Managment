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

}
