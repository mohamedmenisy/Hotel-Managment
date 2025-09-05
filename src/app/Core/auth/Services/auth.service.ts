import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }

  login(data:any):Observable<any>{
    console.log('Service called: users/login');
    return this._HttpClient.post('users/login',data)
  }
     
}


