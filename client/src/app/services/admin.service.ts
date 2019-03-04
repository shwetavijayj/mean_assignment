import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url: String;
  constructor(private http: HttpClient, private router: Router) {
    this.url = "http://localhost:8080";
  }


  //1
  getAllUsers(callback) {

    let resp: Object;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("authorization"),
        "UserId": sessionStorage.getItem("UserId")
      })
    };
    this.http.get(`${this.url}/users/getAllUsers`, httpOptions).subscribe(data => {
      console.log("Data is", data);
      resp = data;
    });
    callback(resp);
  }

  //2
  getAllUserRole(): Observable<Object> {
    let resp: Observable<Object>;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("authorization"),
        "UserId": sessionStorage.getItem("UserId")
      })
    };
    resp = this.http.get(`${this.url}/users/getUserRole`, httpOptions);
    return resp;


  }

  //3
  getPendingRequestData() {
    let resp: Observable<Object>;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("authorization"),
        "UserId": sessionStorage.getItem("UserId")
      })
    };
    resp = this.http.get(`${this.url}/users/getTemporaryUsers`, httpOptions);
    return resp;
  }

  //4
  getIncompleteUserData() {
    let resp: Observable<Response>;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("authorization"),
        "UserId": sessionStorage.getItem("UserId")
      })
    };
    this.http.get(`${this.url}/users/registerUser`, httpOptions).subscribe(data => {
      console.log("Data is", data);
    });
    return resp;
  }

  //5
  saveData(userData) {
    let resp: Observable<Response>;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("authorization"),
        "UserId": sessionStorage.getItem("UserId")
      })
    };
    this.http.post(`${this.url}/users/registerUser`, userData, httpOptions).subscribe(data => {
      console.log("Data is", data);
    });
    return resp;
  }

  //6
  updateUser(userData) {
    let resp: Observable<Response>;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("authorization"),
        "UserId": sessionStorage.getItem("UserId")
      })
    };
    this.http.post(`${this.url}/users/updateUser`, userData, httpOptions).subscribe(data => {
      console.log("Data is", data);
    });
    return resp;
  }


  //7
  saveData1(userData) {
    let resp: Observable<Response>;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("authorization"),
        "UserId": sessionStorage.getItem("UserId")
      })
    };
    this.http.post(`${this.url}/users/registerUser1`, userData, httpOptions).subscribe(data => {
      console.log("Data is", data);
    });
    return resp;
  }




  //8
  rejectData(userData) {
    let resp: Observable<Response>;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("authorization"),
        "UserId": sessionStorage.getItem("UserId")
      })
    };
    this.http.post(`${this.url}/users/rejectUserRequest`, userData, httpOptions).subscribe(data => {
      console.log("Data is", data);
    });
    return resp;
  }


}