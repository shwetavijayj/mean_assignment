import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-personal-info-display',
  templateUrl: './personal-info-display.component.html',
  styleUrls: ['./personal-info-display.component.css']
})
export class PersonalInfoDisplayComponent implements OnInit {

  public personDetails: any;
  userInfoDisplayform: FormGroup;
  public fname: String;
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
      (resp: Response) => {
        this.personDetails = resp.data[0];
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
      },
      error => {
        this.router.navigateByUrl('error');
      }
    );
  }

}
