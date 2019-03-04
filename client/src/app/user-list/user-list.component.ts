import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  public persons: Array<any> = [];
  public collapse: any;
  public btnMsg: String;
  constructor(private serv: AdminService, private router: Router) {
    this.collapse = false;
    this.btnMsg = "More Details";
  }

  ngOnInit() {

    this.serv.getPendingRequestData().subscribe(
      (resp: Response) => {
        (resp.data).forEach(element => {
          this.persons.push(element);
        });

      },
      error => {
        this.router.navigateByUrl('error');
      }
    )
  }

  toggle() {
    this.collapse = !this.collapse;
    if (this.collapse == true) {
      this.btnMsg = "Collapse details";
    }
    else {
      this.btnMsg = "More details";
    }
  }

}
