import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {

  title = 'app';
  isLogin = false;
    constructor(private location: Location, private userService: UsersService) {
    }

  ngOnInit(): void {
    UsersService.isLogin.subscribe(ret => this.isLogin = ret);
    this.checkRouterLogin();
  }

  ngAfterViewChecked(): void {
  }

  checkRouterLogin() {
    this.isLogin = this.location.path() === '/login' || this.location.path().indexOf('newpass') >= 0;
    UsersService.isLogin.emit(this.isLogin);
    UsersService.isLogin.subscribe(ret => this.isLogin = ret);

    console.log('isLogin', this.isLogin);
  }
}
