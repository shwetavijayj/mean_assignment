import { Component, OnInit } from '@angular/core';
import { CreationService } from '../services/creation.service';
import { AdminService } from '../services/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  roleCount: any;
  createUserRole: FormGroup;
  userRole: any;
  constructor(private serv: CreationService, private getServ: AdminService, private router: Router) {
    this.createUserRole = new FormGroup({
      roleName: new FormControl(['', Validators.required])
    })
  }
  get roleName() {
    return this.createUserRole.get('roleName');
  }
  ngOnInit() {

    this.getServ.getAllUserRole().subscribe(
      (resp: any) => {
        console.log(resp.data.data);
        this.roleCount = resp.data.data.length;
        console.log(this.roleCount);
        (resp.data.data).forEach(element => {
          this.userRole.push(element.roleName);
          console.log(this.userRole);
        });
      },
      error => {
        this.router.navigateByUrl('error');
      }
    );

  }
  createRole() {
    let userData = {
      roleId: ++this.roleCount,
      roleName: this.createUserRole.value.roleName
    }
    this.serv.createRole(userData).subscribe(
      (resp: Response) => {
        this.router.navigateByUrl('adminHomepage');
      },
      error => {
        this.router.navigateByUrl('error');
      }
    )
  }


}
