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

  constructor(private http: HttpClient) { }

  login(orgCode: any, loginId: any, keyword: any): Observable<any> {
    const data = {
      orgCode: orgCode,
      loginId: loginId,
      keyword: keyword,
    };
    return this.http.post(`${this.baseUrl}/signIn`, data);
  }

  logout(): Observable<any> {
    const getToken = {
      apiAccessSessionToken: `Bearer ${this.token}`
    }
    return this.http.post(`${this.baseUrl}/signOut`, getToken);
  }

  authorize(): Observable<any> {
    const getToken = {
      apiAccessSessionToken: `Bearer ${this.token}`
    }
    return this.http.post(`${this.baseUrl}/authenticate/token`, getToken);
  }

  createparty(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/onboarding/submit`, data);
  }

  getUsers(): Observable<any> {
    const payload = {
      entityTypeCode: "API_GW_PARTY",
      filters: [],
      pagination: {
        pageSize: 1000,
        pageIndex: 0
      },
      sorting: {
        key: "createdOn",
        value: "asc"
      }
    }
    return this.http.post<any>(`${this.baseUrl}/user/list`, payload);
  }

  getParties(): Observable<any> {
    const payload = {
      entityTypeCode: "API_GW_PARTY",
      filters: [],
      pagination: {
        pageSize: 1000,
        pageIndex: 0
      },
      sorting: {
        key: "createdOn",
        value: "asc"
      }
    }
    return this.http.post<any>(`${this.baseUrl}/customer/list`, payload);
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