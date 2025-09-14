import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    constructor(private _http:HttpClient) { }
    getAllUsers(page: number,size: number): Observable<any> {
       return this._http.get<any>(`admin/users?page=${page}&size=${size}`);
    }
    getUserProfile(id:any):Observable<any> {
       return this._http.get(`admin/users/${id}`);
    }
}
