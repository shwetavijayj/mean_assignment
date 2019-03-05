import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
declare var require: any;
var states = require('../../assets/states.json');
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  addinfo: FormGroup;
  public Gender = ['Male', 'Female', 'Other'];
  public maritalstatus = ['Married', 'Unmarried', 'Divorced', 'Widow', 'Widower'];
  public edustatus = ['Masters', 'Phd', 'Graduate', 'Under-Graduate', 'HSC', 'SSC', 'Illiterate'];
  public state = Object.values(states);
  public age;
  constructor(private serv: UserService, private router: Router) {
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
  }

  save() {
    this.serv.addUserDetails(this.addinfo.value).subscribe(
      (resp: Response) => {
        this.router.navigateByUrl('editinfo');
      },
      error => {
        this.router.navigateByUrl('error');
      }
    )
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
