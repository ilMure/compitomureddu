import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  post(data: any, isLogin: boolean): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    if (isLogin)
      return this.httpClient.post("http://localhost:8080/login", data, httpOptions);
    else 
      return this.httpClient.post("http://localhost:8080/register", data, httpOptions);
   }
}
