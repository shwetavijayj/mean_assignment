import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from "rxjs";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreationService {
  url: String;
  constructor(private http: HttpClient, private router: Router) {
    this.url = "http://localhost:8080";
  }

  //2
  createUser(userData) {
    let resp: Observable<Object>;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("authorization"),
        "UserId": sessionStorage.getItem("UserId")
      })
    };
    resp = this.http.post(`${this.url}/users/createUser`, userData, httpOptions);
    return resp;
  }

  //3
  createRole(roleDetails) {
    let resp: Observable<Object>;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("authorization"),
        "UserId": sessionStorage.getItem("UserId")
      })
    };
    resp = this.http.post(`${this.url}/users/userRole`, roleDetails, httpOptions);
    return resp;
  }

  //logout service 
  logout() {
    let resp: Observable<Object>;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("authorization"),
        "UserId": sessionStorage.getItem("UserId")
      })
    };
    sessionStorage.setItem("TempUser", "0");
    resp = this.http.post(`${this.url}/logout`, httpOptions)
    return resp;
  }

}
