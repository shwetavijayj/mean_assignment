import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  constructor(private formBuilder: FormBuilder, private serv: UserService, private router: Router, private adminserv: AdminService) {
    this.addinfo = new FormGroup({
      fname: new FormControl(['', Validators.required]),
      mname: new FormControl(['', Validators.required]),
      lname: new FormControl(['', Validators.required]),
      gender: new FormControl(),
      dateofbirth: new FormControl(),
      age: new FormControl(),
      addr1: new FormControl(['', Validators.required]),
      addr2: new FormControl(['', Validators.required]),
      addr3: new FormControl(['', Validators.required]),
      city: new FormControl(['', Validators.required]),
      state1: new FormControl(),
      pincode: new FormControl(['', Validators.required]),
      phone: new FormControl(),
      mobile: new FormControl(['', Validators.required]),
      physicaldisability: new FormControl(),
      maritalstatus: new FormControl(),
      edustatus: new FormControl(),
      birthsign: new FormControl()
    })
    this.addinfo = this.formBuilder.group({
      fname: ['', Validators.required],
      mname: ['', Validators.required],
      lname: ['', Validators.required],
      gender: [''],
      dateofbirth: [''],
      age: [''],
      addr1: ['', Validators.required],
      addr2: ['', Validators.required],
      addr3: ['', Validators.required],
      city: ['', Validators.required],
      state1: [''],
      pincode: ['', Validators.required],
      phone: [''],
      mobile: ['', Validators.required],
      physicaldisability: [''],
      maritalstatus: [''],
      edustatus: [''],
      birthsign: ['']
    });
  }
  get fname() {
    return this.addinfo.get('fname');
  }
  get mname() {
    return this.addinfo.get('mname');
  }
  get lname() {
    return this.addinfo.get('lname');
  }
  get addr1() {
    return this.addinfo.get('addr1');
  }
  get addr2() {
    return this.addinfo.get('addr2');
  }
  get addr3() {
    return this.addinfo.get('addr3');
  }
  get city() {
    return this.addinfo.get('city');
  }
  get pincode() {
    return this.addinfo.get('pincode');
  }
  get mobile() {
    return this.addinfo.get('mobile');
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
  clear() {
    this.addinfo.controls['fname'].setValue(' ');
    this.addinfo.controls['mname'].setValue(' ');
    this.addinfo.controls['lname'].setValue(' ');
    this.addinfo.controls['gender'].setValue(' ');
    this.addinfo.controls['dateofbirth'].setValue(' ');
    this.addinfo.controls['age'].setValue(0);
    this.addinfo.controls['addr1'].setValue(' ');
    this.addinfo.controls['addr2'].setValue(' ');
    this.addinfo.controls['addr3'].setValue(' ');
    this.addinfo.controls['city'].setValue(' ');
    this.addinfo.controls['state1'].setValue(' ');
    this.addinfo.controls['pincode'].setValue(0);
    this.addinfo.controls['phone'].setValue(0);
    this.addinfo.controls['mobile'].setValue(0);
    this.addinfo.controls['physicaldisability'].setValue(' ');
    this.addinfo.controls['maritalstatus'].setValue(' ');
    this.addinfo.controls['edustatus'].setValue(' ');
    this.addinfo.controls['birthsign'].setValue(' ');
  }
}
