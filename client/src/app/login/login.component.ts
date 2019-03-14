import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  model: any = {};
  constructor(private serv: LoginService, private router: Router) {
    this.loginform = new FormGroup({
      UserName: new FormControl(['', Validators.required]),
      Password: new FormControl(['', Validators.required])
    })
  }

  get UserName() {
    return this.loginform.get('UserName');
  }

  get Password() {
    return this.loginform.get('Password');
  }

  ngOnInit() {
  }
  login() {
    this.serv.authenticateUser(this.loginform.value).pipe(map(data => {
      let result: any = Object.assign({}, data);
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
        sessionStorage.setItem("isApproved", result.isApproved);
        if (result.PersonalUniqueId == null && result.isApproved == 0) {
          this.router.navigateByUrl('addinfo');
        } else if (result.PersonalUniqueId == null && result.isApproved == null) {
          sessionStorage.setItem("PersonalUniqueId", result.PersonalUniqueId);
          sessionStorage.setItem("TempUser", "1");
          this.router.navigateByUrl('editinfo');
        } else if (result.PersonalUniqueId != null && result.isApproved == 0) {
          sessionStorage.setItem("PersonalUniqueId", result.PersonalUniqueId);
          sessionStorage.setItem("TempUser", "0");
          this.router.navigateByUrl('editinfo');
        }
        else if (result.PersonalUniqueId != null && result.isApproved == 1) {
          sessionStorage.setItem("PersonalUniqueId", result.PersonalUniqueId);
          sessionStorage.setItem("TempUser", "1");
          this.router.navigateByUrl('editinfo');
        }
      }
    })).subscribe();

  }

}
