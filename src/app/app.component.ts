import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {

  title = 'app';
  isLogin: boolean;
    constructor(private location: Location) {
    }

  ngOnInit(): void {
    this.checkRouterLogin();
  }

  ngAfterViewChecked(): void {
    this.checkRouterLogin();
  }

  checkRouterLogin() {
    this.isLogin = this.location.path() === '/login';
    console.log('isLogin', this.isLogin);
  }
}
