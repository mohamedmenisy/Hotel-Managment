import { Router } from '@angular/router';
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

  constructor(private _http:HttpClient,private Router:Router){}

  onForget(data: any): Observable<IforgotPassword> {
    return this._http.post<IforgotPassword>('admin/users/forgot-password', data)
  }

  onReset(data: any): Observable<IresetPassword> {
    return this._http.post<IresetPassword>('admin/users/reset-password', data)
  }


  ChangePassword(data:IChangePasswordData):Observable<IchangePasswordResponse>{
   return this._http.post<IchangePasswordResponse>("admin/users/change-password",data);
  }

    login(data:any):Observable<any>{
    return this._http.post('admin/users/login',data)
  }


    onRegister(data:any):Observable<Iregister>{
    return this._http.post<Iregister>('admin/users',data)
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    this.Router.navigate(['/auth/login']);
  }

 getCurrentUser(id:any): Observable<any>{
  return this._http.get(`admin/users/${id}`);
  }
}
