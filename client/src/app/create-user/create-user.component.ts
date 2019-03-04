import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormGroup, FormControl } from '@angular/forms';
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
      UserName: new FormControl(),
      EmailAddress: new FormControl(),
      roleName: new FormControl()
    })
  }
  public userRole = []
  ngOnInit() {
    this.serv.getAllUserRole().subscribe(
      (resp: Response) => {
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
      (resp: Response) => {
        this.router.navigateByUrl('adminHomepage');
      },
      error => {
        this.router.navigateByUrl('error');
      }

    )
  }

}
