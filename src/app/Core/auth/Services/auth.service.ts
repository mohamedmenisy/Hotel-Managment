import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChangePasswordData, IchangePasswordResponse } from '../Interfaces/ichange-password';
import { IforgotPassword } from '../Interfaces/iforgot-password';
import { IresetPassword } from '../Interfaces/ireset-password';
import { Iregister } from '../Interfaces/iregister';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient){}

  onForget(d: any): Observable<IforgotPassword> {
    return this._http.post<IforgotPassword>('users/forgot-password', d)
  }

  onReset(d: any): Observable<IresetPassword> {
    return this._http.post<IresetPassword>('users/reset-password', d)
  }


  ChangePassword(data:IChangePasswordData):Observable<IchangePasswordResponse>{
   return this._http.post<IchangePasswordResponse>("users/change-password",data);
  }

    login(data:any):Observable<any>{
    return this._http.post('users/login',data)
  }


    onRegister(data:any):Observable<Iregister>{
    return this._http.post<Iregister>('users',data)
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
  }

}
