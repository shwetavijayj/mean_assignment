import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: String;
  constructor(private http: HttpClient, private router: Router) {
    this.url = "http://localhost:8080";
  }
  authenticateUser(userDetails): Observable<Response> {
    let resp: Observable<Response>;

    //1. define reuest header
    console.log("In service", JSON.stringify(userDetails));
    let header: Headers = new Headers({ 'Content-Type': "application/json" });
    // header.append("AUTHORIZATION","Basic Username:password");
    //2. define request options for header collection of header values
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    resp = this.http.post(`${this.url}/`, userDetails, httpOptions);
    return resp;
  }
}
