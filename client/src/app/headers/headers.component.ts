import { Component, OnInit } from '@angular/core';
import { CreationService } from '../services/creation.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {

  constructor(private serv: CreationService, private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.serv.logout().subscribe(
      (resp: Response) => {
        this.router.navigateByUrl('');
      },
      error => {
        this.router.navigateByUrl('error');
      }
    )
  }
}
