import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navtop',
  templateUrl: './navtop.component.html',
  styleUrls: ['./navtop.component.scss']
})
export class NavtopComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('scToken');
    this.router.navigate(['login']);
  }

}
