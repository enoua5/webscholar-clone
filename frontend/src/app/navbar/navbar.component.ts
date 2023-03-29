import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  getName() {
    return sessionStorage.getItem('name');
  }

  getRole()
  {
    return sessionStorage.getItem('userType');
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate(['/']).then(res => true);
  }
}
