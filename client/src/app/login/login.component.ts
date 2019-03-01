import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;
  constructor(private serv: LoginService, private router: Router) {
    this.loginform = new FormGroup({
      UserName: new FormControl(),
      Password: new FormControl()
    })
  }

  ngOnInit() {
  }
  login() {
    this.serv.authenticateUser(this.loginform.value).pipe(map(data => {
      let result = Object.assign({}, data);
      sessionStorage.setItem("authorization", result.responseToken);
      sessionStorage.setItem("roleId", result.roleId);
      sessionStorage.setItem("UserName", result.UserName);
      sessionStorage.setItem("UserId", result.UserId);
      if (result.roleId === 1) {
        this.router.navigateByUrl('adminHomepage');
      }
      else if (result.roleId === 2) {
        this.router.navigateByUrl('error');
      }
      else if (result.roleId === 3) {
        if (result.PersonalUniqueId == null) {
          this.router.navigateByUrl('addinfo');
        } else {
          this.router.navigateByUrl('editinfo');
        }
      }
    })).subscribe();

  }

}
