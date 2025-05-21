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


  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signIn`, data,);
  }

  logout(token: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signOut`, token);
  }

  authorize(token: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate/token`, token);
  }

  createparty(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/onboarding/submit`, data);
  }

  getUsers(pagination: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/list`, pagination);
  }

  getParties(pagination: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/customer/list`, pagination);
  }

  editUser(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/modify`, payload);
  }

  editParty(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/customer/modify`, payload);
  }

  userActive(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/inActive`, payload);
  }

  userInactive(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/active`, payload);
  }

  partyActive(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/customer/inActive`, payload);
  }

  partyInactive(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/customer/active`, payload);
  }
}