import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  public persons: Array<any> = [];
  public emptyFlag: Boolean;
  public btnMsg: String;
  public id: String;
  public searchContent: String;
  constructor(private serv: AdminService, private router: Router) {


  }

  ngOnInit() {

    this.serv.getPendingRequestData().subscribe(
      (resp: any) => {
        (resp.data).forEach(element => {
          element.collapse = false;
          element.btnMsg = "More Details";
          this.persons.push(element);
        });
        if (this.persons.length === 0) {
          this.emptyFlag = true;
        }
        else {
          this.emptyFlag = false;
        }
      },
      error => {
        this.router.navigateByUrl('error');
      }
    )
  }

  toggle(ele) {
    console.log("-->", ele.collapse);
    ele.collapse = !ele.collapse;

    if (ele.collapse == true) {
      ele.btnMsg = "Collapse details";
    }
    else {
      ele.btnMsg = "More details";
    }
  }

  approve(element) {
    console.log("user data is", element);
    if (element.PersonalUniqueId) {
      this.serv.updateUser(element).subscribe(
        (resp: any) => {
          this.router.navigateByUrl('userlist');
        },
        error => {
          this.router.navigateByUrl('error');
        }

      )
    } else {
      this.serv.saveData(element).subscribe(
        (resp: any) => {
          this.router.navigateByUrl('userlist');
        },
        error => {
          this.router.navigateByUrl('error');
        }

      )
    }
  }

  reject(element) {
    this.serv.rejectData(element).subscribe(
      (resp: any) => {
        this.router.navigateByUrl('userlist');
      },
      error => {
        this.router.navigateByUrl('error');
      }

    )
  }
}


