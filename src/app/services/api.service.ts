import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://172.16.16.49:7055/v1/trade'
  // private baseUrl = 'http://localhost:7000/v1/trade'

  token = localStorage.getItem('token')


  constructor(private http: HttpClient, private router: Router) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signIn`, data,);
  }

  logout(token: any): Observable<any> {
    const headers = new HttpHeaders({
      "Authorization": `${this.token}`
    });
    return this.http.post(`${this.baseUrl}/signOut`, token, { headers });
  }

  authorize(token: any): Observable<any> {
    const headers = new HttpHeaders({
      "Authorization": `${this.token}`
    });
    return this.http.post(`${this.baseUrl}/authenticate/token`, token, { headers });
  }

  createparty(data: any): Observable<any> {
    const headers = new HttpHeaders({
      "client_id": "xzXNJFzxNtMvyLIFXCUL1005"
    });
    return this.http.post(`${this.baseUrl}/onboarding/submit`, data, { headers });
  }

  getUsers(pagination: any): Observable<any> {
    const headers = new HttpHeaders({
      "client_id": "xzXNJFzxNtMvyLIFXCUL1005"
    });
    return this.http.post<any>(`${this.baseUrl}/user/list`, pagination, { headers });
  }

  getParties(pagination: any): Observable<any> {
    const headers = new HttpHeaders({
      "client_id": "xzXNJFzxNtMvyLIFXCUL1005"
    });
    return this.http.post<any>(`${this.baseUrl}/customer/list`, pagination, { headers });
  }

  editUser(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      "client_id": "xzXNJFzxNtMvyLIFXCUL1005"
    });
    return this.http.post<any>(`${this.baseUrl}/user/modify`, payload, { headers });
  }

  editParty(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      "client_id": "xzXNJFzxNtMvyLIFXCUL1005"
    });
    return this.http.post<any>(`${this.baseUrl}/customer/modify`, payload, { headers });
  }

  userActive(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      "client_id": "xzXNJFzxNtMvyLIFXCUL1005"
    });
    return this.http.post<any>(`${this.baseUrl}/user/inActive`, payload, { headers });
  }

  userInactive(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      "client_id": "xzXNJFzxNtMvyLIFXCUL1005"
    });
    return this.http.post<any>(`${this.baseUrl}/user/active`, payload, { headers });
  }

  partyActive(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      "client_id": "xzXNJFzxNtMvyLIFXCUL1005"
    });
    return this.http.post<any>(`${this.baseUrl}/customer/inActive`, payload, { headers });
  }

  partyInactive(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      "client_id": "xzXNJFzxNtMvyLIFXCUL1005"
    });
    return this.http.post<any>(`${this.baseUrl}/customer/active`, payload, { headers });
  }
}