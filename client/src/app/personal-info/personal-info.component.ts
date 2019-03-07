import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
declare var require: any;
var states = require('../../assets/states.json');
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  addinfo: FormGroup;
  public adminFlag: Boolean;
  public Gender1 = ['Male', 'Female', 'Other'];
  public maritalstatus1 = ['Married', 'Unmarried', 'Divorced', 'Widow', 'Widower'];
  public edustatus1 = ['Masters', 'Phd', 'Graduate', 'Under-Graduate', 'HSC', 'SSC', 'Illiterate'];
  public state = Object.values(states);
  public age;
  public incomplete: Boolean;
  constructor(private serv: UserService, private router: Router, private adminserv: AdminService) {
    this.addinfo = new FormGroup({
      fname: new FormControl(),
      mname: new FormControl(),
      lname: new FormControl(),
      gender: new FormControl(),
      dateofbirth: new FormControl(),
      age: new FormControl(),
      addr1: new FormControl(),
      addr2: new FormControl(),
      addr3: new FormControl(),
      city: new FormControl(),
      state1: new FormControl(),
      pincode: new FormControl(),
      phone: new FormControl(),
      mobile: new FormControl(),
      physicaldisability: new FormControl(),
      maritalstatus: new FormControl(),
      edustatus: new FormControl(),
      birthsign: new FormControl()
    })
  }

  ngOnInit() {
    if (sessionStorage.getItem("incomplete") === "false") {
      this.incomplete = false;
    }
    else {
      this.incomplete = true;
    }
    if (parseInt(sessionStorage.getItem("roleId")) === 1) {
      this.adminFlag = true;
    }
    else {
      this.adminFlag = false;
    }
  }

  save() {
    if (parseInt(sessionStorage.getItem("roleId")) === 3) {
      this.serv.addUserDetails(this.addinfo.value).subscribe(
        (resp: Response) => {
          this.router.navigateByUrl('editinfo');
        },
        error => {
          this.router.navigateByUrl('error');
        }
      )
    }
    else {
      let userDetails = {
        UserId: sessionStorage.getItem("UserId"),
        FullName: {
          fname: this.addinfo.value.fname,
          mname: this.addinfo.value.mname,
          lname: this.addinfo.value.lname
        },
        Gender: this.addinfo.value.Gender,
        DateOfBirth: this.addinfo.value.DateOfBirth,
        Age: this.addinfo.value.Age,
        Address: {
          addr1: this.addinfo.value.addr1,
          addr2: this.addinfo.value.addr2,
          addr3: this.addinfo.value.addr3
        },
        City: this.addinfo.value.City,
        State: this.addinfo.value.state1,
        Pincode: this.addinfo.value.Pincode,
        Phone: this.addinfo.value.Phone,
        Mobile: this.addinfo.value.Mobile,
        physicaldisability: this.addinfo.value.physicaldisability,
        maritalstatus: this.addinfo.value.maritalstatus,
        edustatus: this.addinfo.value.edustatus,
        birthsign: this.addinfo.value.birthsign
      }
      this.adminserv.saveData(userDetails).subscribe(
        (resp: Response) => {
          this.router.navigateByUrl('getUser');
        },
        error => {
          this.router.navigateByUrl('error');
        }
      )
    }
  }
  calculateAge() {
    console.log("Dob", this.addinfo.value.dateofbirth);
    var today = new Date();
    var yyyy = today.getFullYear();
    var selectedDate = new Date(this.addinfo.value.dateofbirth);
    let age = yyyy - selectedDate.getFullYear();
    console.log("Age", age);
    this.age = age;
  }
}
