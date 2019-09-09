import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newpass',
  templateUrl: './newpass.component.html',
  styleUrls: ['./newpass.component.scss']
})
export class NewpassComponent implements OnInit {

  login: string;
  password: string;
  repeatPassword: string;
  formNewPass: FormGroup;
  erroLogin = false;
  loading = false;
  messageErro: string;
  successChanged = false;
  messageSucess: string;
  token: string;
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    sessionStorage.removeItem('scToken');
    this.createFormNewPass(this.password, this.repeatPassword);
    this.verificaTokenUri();
  }

  verificaTokenUri() {
    this.token = this.route.snapshot.paramMap.get('token');
    sessionStorage.setItem('scToken', this.token);
  }

  createFormNewPass(password: string, repeatPassword: string) {
    this.formNewPass = this.formBuilder.group({
      password: [password, [Validators.required]],
      repeatPassword: [repeatPassword, [Validators.required]]
    });
  }

  sendNewPass() {
    this.loading = true;
    this.erroLogin = false;
    this.successChanged = false;

    this.password = this.formNewPass.value.password;
    this.repeatPassword = this.formNewPass.value.repeatPassword;

    if (this.password !== this.repeatPassword) {
      this.loading = false;
      this.messageErro = 'As senhas não conferem.';
      this.erroLogin = true;

    } else {
      this.loginService.setNewPass(this.password).subscribe(
        (ret: any) => {
          this.loading = false;
          if (ret.success) {
            this.successChanged = true;
            this.messageSucess = ret.message;
          } else {
            this.messageErro = ret.message;
            this.erroLogin = true;
          }
        },
        (err: any) => {
            this.messageErro = 'Parece que este link perdeu a validade.';
            this.erroLogin = true;
          });

    }
  }


}
