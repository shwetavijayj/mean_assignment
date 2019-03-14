import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreationService } from '../services/creation.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createUserform: FormGroup;
  constructor(private serv: AdminService, private createServ: CreationService, private router: Router) {
    this.createUserform = new FormGroup({
      UserName: new FormControl(['', Validators.required]),
      EmailAddress: new FormControl(['', Validators.required]),
      roleName: new FormControl()
    })
  }
  get UserName() {
    return this.createUserform.get('UserName');
  }
  get EmailAddress() {
    return this.createUserform.get('EmailAddress');
  }
  public userRole = []
  ngOnInit() {
    this.serv.getAllUserRole().subscribe(
      (resp: any) => {
        console.log(resp.data.data);
        (resp.data.data).forEach(element => {
          this.userRole.push(element.roleName);
        });
      },
      error => {
        this.router.navigateByUrl('error');
      }
    );
  }
  createUser() {
    this.createServ.createUser(this.createUserform.value).subscribe(
      (resp: any) => {
        this.router.navigateByUrl('adminHomepage');
      },
      error => {
        this.router.navigateByUrl('error');
      }

    )
  }

}
