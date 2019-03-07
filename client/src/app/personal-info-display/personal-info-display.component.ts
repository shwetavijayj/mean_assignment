import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
declare var require: any;
var states = require('../../assets/states.json');
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-personal-info-display',
  templateUrl: './personal-info-display.component.html',
  styleUrls: ['./personal-info-display.component.css']
})
export class PersonalInfoDisplayComponent implements OnInit {

  public Gender1 = ['Male', 'Female', 'Other'];
  public maritalstatus1 = ['Married', 'Unmarried', 'Divorced', 'Widow', 'Widower'];
  public edustatus1 = ['Masters', 'Phd', 'Graduate', 'Under-Graduate', 'HSC', 'SSC', 'Illiterate'];
  public state = Object.values(states);
  public personDetails: any;
  public showMsg: String;
  public editBtn: Boolean;
  userInfoDisplayform: FormGroup;
  public fname: String;
  public mname: String;
  public lname: String;
  public Gender: String;
  public DateOfBirth: Date;
  public Age: Number;
  public addr1: String;
  public addr2: String;
  public addr3: String;
  public City: String;
  public State: String;
  public Pincode: Number;
  public Phone: Number;
  public Mobile: Number;
  public physicaldisability: String;
  public maritalstatus: String;
  public edustatus: String;
  public birthsign: String;
  public isreadOnly: Boolean;
  constructor(private serv: UserService, private router: Router) {
    this.userInfoDisplayform = new FormGroup({
      fname: new FormControl(),
      mname: new FormControl(),
      lname: new FormControl(),
      Gender: new FormControl(),
      DateOfBirth: new FormControl(),
      Age: new FormControl(),
      addr1: new FormControl(),
      addr2: new FormControl(),
      addr3: new FormControl(),
      City: new FormControl(),
      State: new FormControl(),
      Pincode: new FormControl(),
      Phone: new FormControl(),
      Mobile: new FormControl(),
      physicaldisability: new FormControl(),
      maritalstatus: new FormControl(),
      edustatus: new FormControl(),
      birthsign: new FormControl()
    });

  }

  ngOnInit() {
    let id = sessionStorage.getItem("UserId");
    this.serv.getUserData(id).subscribe(
      (resp: any) => {
        this.personDetails = resp.data[0];
        console.log("Personal details", this.personDetails);
        if ((sessionStorage.getItem("PersonalUniqueId") === "null") && (sessionStorage.getItem("TempUser") === "1")) {
          this.showMsg = "Your data is not yet approved by admin, you can edit your profile only after approval of current request."
          this.editBtn = false;
        }
        else if ((sessionStorage.getItem("TempUser") === "0")) {
          this.showMsg = "Your change request is not yet approved by admin, you can edit your profile only after approval of current request.and your changed profile will be reflected soon.."
          this.editBtn = false;
        }
        else {
          this.editBtn = true;
        }
        this.fname = this.personDetails.FullName.fname;
        this.mname = this.personDetails.FullName.lname;
        this.lname = this.personDetails.FullName.mname;
        this.Gender = this.personDetails.Gender;
        this.DateOfBirth = this.personDetails.DateOfBirth;
        this.Age = this.personDetails.Age;
        this.addr1 = this.personDetails.Address.addr1;
        this.addr2 = this.personDetails.Address.addr2;
        this.addr3 = this.personDetails.Address.addr3;
        this.City = this.personDetails.City;
        this.State = this.personDetails.State;
        this.Pincode = this.personDetails.Pincode;
        this.Phone = this.personDetails.Phone;
        this.Mobile = this.personDetails.Mobile;
        this.physicaldisability = this.personDetails.physicaldisability;
        this.maritalstatus = this.personDetails.maritalstatus;
        this.edustatus = this.personDetails.edustatus;
        this.birthsign = this.personDetails.birthsign;
        this.isreadOnly = true;
      },
      error => {
        this.router.navigateByUrl('error');
      }
    );
  }

  toggleReadonly() {
    this.isreadOnly = false;
  }



  updateData() {
    console.log("update", this.userInfoDisplayform.value);
    this.serv.updateUserData(this.userInfoDisplayform.value, this.personDetails.PersonalUniqueId).subscribe(
      (resp: any) => {
        sessionStorage.setItem("TempUser", "0");
        this.router.navigateByUrl('editinfo');
      },
      error => {
        this.router.navigateByUrl('error');
      }
    );
  }
}
