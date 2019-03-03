import { Component, OnInit } from '@angular/core';
import { CreationService } from '../services/creation.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {

  constructor(private serv:CreationService,private getServ:AdminService) { }

  ngOnInit() {
    let result:any;
    result=this.getServ.getAllUserRole().subscribe();
    console.log("Result:",result);
  }


}
