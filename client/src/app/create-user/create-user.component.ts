import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';



@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private serv: AdminService) { }
  public userRole = ['Admin', 'Operator', 'Access_user']
  ngOnInit() {
    let result = this.serv.getAllUserRole();
    console.log(result);
  }

}
