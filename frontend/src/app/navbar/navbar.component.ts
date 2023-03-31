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
    let firstName = sessionStorage.getItem('firstName');
    let lastName = sessionStorage.getItem('lastName');
    if(firstName == null && lastName == null){
      return null;
    }else if(firstName == null){
      return firstName;
    }else if(lastName == null){
      return lastName;
    }else{
      return firstName + " " + lastName;
    }
  }

  getRole()
  {
    return sessionStorage.getItem('role');
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate(['/']).then(res => true);
  }
}
