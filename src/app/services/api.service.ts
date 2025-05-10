import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private baseUrl = 'http://172.16.16.49:7055/v1/trade'
  private baseUrl = 'http://localhost:7000/v1/trade'

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signIn`, data);
  }

  logout(token: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signOut`, token);
  }

  authorize(token: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate/token`, token);
  }

  createparty(data: any): Observable<any> {
    const headers = new HttpHeaders({
      "client_id": "xzXNJFzxNtMvyLIFXCUL1005"
    })
    return this.http.post(`${this.baseUrl}/onboarding/submit`, data, { headers });
  }

}