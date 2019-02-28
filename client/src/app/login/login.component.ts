import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;
  constructor(private serv: LoginService) {
    this.loginform = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit() {
  }
  login() {
    this.serv.authenticateUser(this.loginform.value);

  }

}
