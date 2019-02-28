import { Component, OnInit } from '@angular/core';
var states = require('../../assets/states.json');
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  public Gender = ['Male', 'Female', 'Other'];
  public maritalstatus = ['Married', 'Unmarried', 'Divorced', 'Widow', 'Widower'];
  public edustatus = ['Masters', 'Phd', 'Graduate', 'Under-Graduate', 'HSC', 'SSC', 'Illiterate'];
  public state = Object.values(states);
  constructor() { }

  ngOnInit() {
  }

}
