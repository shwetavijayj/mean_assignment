import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-incompleteuser',
  templateUrl: './incompleteuser.component.html',
  styleUrls: ['./incompleteuser.component.css']
})
export class IncompleteuserComponent implements OnInit {

  public incompleteusers: any = [];
  public btnMsg: String;
  constructor(private serv: AdminService, private router: Router) { }

  ngOnInit() {
    this.serv.getIncompleteUserData().subscribe(
      (resp: any) => {

        (resp.data).forEach(element => {
          element.btnMsg = "More Details";
          element.collapse = false;
          this.incompleteusers.push(element);
        });
        console.log(this.incompleteusers);
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
      sessionStorage.setItem("incomplete", "false");
    }
    else {
      ele.btnMsg = "More details";
      sessionStorage.setItem("incomplete", "true");
    }
  }

}
