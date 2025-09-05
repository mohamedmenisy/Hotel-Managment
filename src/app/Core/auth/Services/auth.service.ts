import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChangePasswordData, IchangePasswordResponse } from '../Interfaces/ichange-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient){}
  
  ChangePassword(data:IChangePasswordData):Observable<IchangePasswordResponse>{
   return this._http.post<IchangePasswordResponse>("users",data);
  }
}
