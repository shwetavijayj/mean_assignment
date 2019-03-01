import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  constructor(private serv: AdminService) { }

  ngOnInit() {
    //call api for get permanent users to show on homepage
    console.log("Hello admin");
    this.serv.getAllUsers();
  }

}
