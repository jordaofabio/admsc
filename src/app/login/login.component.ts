import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: string;
  password: string;
  formLogin: FormGroup;
  formForgotPass: FormGroup;
  erroLogin = false;
  loading = false;
  messageErro: string;
  forgotWindow = false;
  successForgot = false;
  messageForgotSucess: string;
  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    UsersService.isLogin.emit(true);
    this.createForm(this.login, this.password);
  }

  createForm(login: string, password: string) {
    this.formLogin = this.formBuilder.group({
      login: [login, [Validators.required]],
      password: [password, [Validators.required]]
    });
  }

  createFormForgotPass(login: string) {
    this.formForgotPass = this.formBuilder.group({
      login: [login, [Validators.required]],
    });
  }

  sendLogin() {
    this.erroLogin = false;
    this.loading = true;
    this.login = this.formLogin.value.login;
    this.password = this.formLogin.value.password;
    this.loginService.setLogin(this.login, this.password).subscribe(
    (ret: any) => {
      this.loading = false;

      if (ret.token) {
        sessionStorage.setItem('scToken', ret.token);
        UsersService.isLogin.emit(false);
        this.router.navigate(['dashboard']);
      } else {
        this.messageErro = ret.message;
        this.erroLogin = true;
      }

    }
   );

  }

  sendForgotPass() {
    this.loading = true;
    this.erroLogin = false;
    this.successForgot = false;

    this.login = this.formForgotPass.value.login;
    this.loginService.newPass(this.login).subscribe(
      (ret: any) => {
        this.loading = false;
        if (ret.success) {
          this.successForgot = true;
          this.messageForgotSucess = ret.message;
        } else {
          this.messageErro = ret.message;
          this.erroLogin = true;
        }

      }
     );
  }

  forgotPass() {
    this.erroLogin = false;
    this.successForgot = false;
    this.forgotWindow = !this.forgotWindow;
    if (this.forgotWindow) {
     this.createFormForgotPass(this.login);
    }
  }

}
