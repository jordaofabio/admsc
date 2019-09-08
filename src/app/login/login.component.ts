import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewChecked {

  login: string;
  password: string;
  formLogin: FormGroup;
  erroLogin = false;
  loading = false;
  messageErro: string;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createForm(this.login, this.password);
  }

  ngAfterViewChecked(): void {
    // this.router.navigate(['/']);
  }

  createForm(login: string, password: string) {
    this.formLogin = this.formBuilder.group({
      login: [login, [Validators.required]],
      password: [password, [Validators.required]]
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
        this.router.navigate(['dashboard']);
      } else {
        this.messageErro = ret.message;
        this.erroLogin = true;
      }

    }
   );

  }

}
