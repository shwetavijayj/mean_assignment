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
  createUser(userData){
    let resp: Observable<Response>;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("authorization"),
        "UserId": sessionStorage.getItem("UserId")
      })
    };
    this.http.post(`${this.url}/users/createUser`,userData, httpOptions).subscribe(data => {
      console.log("Data is", data);
    });
    return resp;
  }

  //3
  createRole(roleDetails){
    let resp: Observable<Response>;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("authorization"),
        "UserId": sessionStorage.getItem("UserId")
      })
    };
    this.http.post(`${this.url}/users/createUser`,roleDetails, httpOptions).subscribe(data => {
      console.log("Data is", data);
    });
    return resp;
  }

  //logout service 
  logout(){
    let resp: Observable<Response>;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("authorization"),
        "UserId": sessionStorage.getItem("UserId")
      })
    };
    this.http.post(`${this.url}/logout`, httpOptions).subscribe(data => {
      console.log("Data is", data);
    });
    return resp;
  }

}
