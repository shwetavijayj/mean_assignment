import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: String;
  constructor(private http: HttpClient, private router: Router) {
    this.url = "http://localhost:8080";
  }

  addUserDetails(userDetails): Observable<Object> {
    let result: Observable<Object>;
    console.log("user data", userDetails);
    let userData = {
      UserId: sessionStorage.getItem("UserId"),
      FullName: {
        fname: userDetails.fname,
        mname: userDetails.mname,
        lname: userDetails.lname
      },
      Gender: userDetails.gender,
      DateOfBirth: userDetails.dateofbirth,
      Age: userDetails.age,
      Address: {
        addr1: userDetails.addr1,
        addr2: userDetails.addr2,
        addr3: userDetails.addr3
      },
      City: userDetails.city,
      State: userDetails.state1,
      Pincode: userDetails.pincode,
      Phone: userDetails.phone,
      Mobile: userDetails.mobile,
      physicaldisability: userDetails.physicaldisability,
      maritalstatus: userDetails.maritalstatus,
      edustatus: userDetails.edustatus,
      birthsign: userDetails.birthsign
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("authorization"),
        "UserId": sessionStorage.getItem("UserId")
      })
    };
    console.log(userData);
    result = this.http.post(`${this.url}/users/registerUserTemp`, JSON.stringify(userData), httpOptions);
    return result;


  }


  getUserData(id) {
    let resp: Observable<Object>;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("authorization"),
        "UserId": sessionStorage.getItem("UserId")
      })
    };
    resp = this.http.get(`${this.url}/${id}`, httpOptions);
    return resp;
  }

  updateUserData(userData, PersonalUniqueId) {

    let userDetails = {
      'UserName': sessionStorage.getItem("UserName"),
      'PersonalUniqueId': PersonalUniqueId,
      'FullName': {
        'fname': userData.fname,
        'mname': userData.mname,
        'lname': userData.lname
      },
      'Gender': userData.Gender,
      'DateOfBirth': userData.DateOfBirth,
      'Age': userData.Age,
      'Address': {
        'addr1': userData.addr1,
        'addr2': userData.addr2,
        'addr3': userData.addr3
      },
      'City': userData.City,
      'State': userData.State,
      'Pincode': userData.Pincode,
      'Phone': userData.Phone,
      'Mobile': userData.Mobile,
      'physicaldisability': userData.physicaldisability,
      'maritalstatus': userData.maritalstatus,
      'edustatus': userData.edustatus,
      'birthsign': userData.birthsign
    }


    let resp: Observable<Object>;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": sessionStorage.getItem("authorization"),
        "UserId": sessionStorage.getItem("UserId")
      })
    };
    resp = this.http.post(`${this.url}/users/updateUserTemp`, JSON.stringify(userDetails), httpOptions);
    return resp;
  }

}
