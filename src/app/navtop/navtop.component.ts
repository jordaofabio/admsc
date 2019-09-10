import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-navtop',
  templateUrl: './navtop.component.html',
  styleUrls: ['./navtop.component.scss']
})
export class NavtopComponent implements OnInit {

  constructor(private router: Router) { }

  activeUser = UsersService.activeUser;

  ngOnInit() {
  }

  logout() {
    sessionStorage.setItem('scToken', '');
    sessionStorage.removeItem('scToken');
    this.router.navigate(['login']);
  }

}
