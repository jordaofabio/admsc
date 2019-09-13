import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadValidators, FileUploadControl } from '@iplab/ngx-file-upload';
import { HttpClient } from '@angular/common/http';
import { AccessLevelsService } from 'src/app/services/access-levels.service';
import { AccessLevel } from 'src/app/models/access-level.model';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  user: User;
  formUser: FormGroup;
  formChangePass: FormGroup;
  private filesControl: FormControl = new FormControl(null, FileUploadValidators.filesLimit(1));
  fileData: File;
  levels: AccessLevel[];
  idUser: number;
  type = 'new';
  isChecked = true;
  success = false;
  erroEnvio = false;
  loading = false;
  openedChangePass = false;
  message: string;
  selectedUser: User;
  activeUser = UsersService.activeUser;
  isCurrentUser = false;

  constructor(private http: HttpClient,
              private userService: UsersService,
              private route: ActivatedRoute,
              private accesLevelsService: AccessLevelsService,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private location: Location) {
      this.createForm();

   }

  ngOnInit() {
    if (this.location.path().indexOf('/my-account') > -1) {
      this.selectUser(this.activeUser.id);
    }

    if (this.route.snapshot.paramMap.get('idUser')) {
      this.selectUser(parseInt(this.route.snapshot.paramMap.get('idUser'), 10));
    }

    this.verifyIsCurrentUser();

    this.accesLevelsService.getLevels().subscribe((x: AccessLevel[]) => this.levels = x);
  }

  verifyIsCurrentUser() {
    if (this.selectedUser) {
      this.isCurrentUser = this.selectedUser.id === this.activeUser.id;
    }
  }

  selectUser(id: number) {
    this.userService.getUser(id).subscribe((u: any) => {
      this.setUser(u);
      this.selectedUser = u;
    });
  }

  createForm() {
    this.user = !this.user ? new User() : this.user;
    this.filesControl = new FormControl(null, FileUploadValidators.filesLimit(1));
    this.formUser = this.formBuilder.group({
      id: [this.user.id],
      firstname: [this.user.firstname, [Validators.required]],
      lastname: [this.user.lastname, [Validators.required]],
      email: [this.user.email, [Validators.email]],
      phone: [this.user.phone, [Validators.maxLength(50)]],
      photo: this.filesControl,
      level: [this.user.level, [Validators.required]],
      enabled: [this.user.enabled]
    });
  }

  createFormNewPass() {
    this.user = !this.user ? new User() : this.user;
    this.filesControl = new FormControl(null, FileUploadValidators.filesLimit(1));
    this.formChangePass = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.success = false;
    this.erroEnvio = false;
    this.loading = true;
    const uploadData = new FormData();
    uploadData.append('id', this.formUser.get('id').value);
    uploadData.append('firstname', this.formUser.get('firstname').value);
    uploadData.append('lastname', this.formUser.get('lastname').value);
    uploadData.append('email', this.formUser.get('email').value);
    uploadData.append('phone', this.formUser.get('phone').value);
    uploadData.append('level', this.formUser.get('level').value);
    uploadData.append('enabled', this.formUser.get('enabled').value);

    if (this.formUser.get('photo').value && this.formUser.get('photo').value.length > 0) {
      this.fileData = this.formUser.get('photo').value;
      uploadData.append('photo', this.fileData[0], this.fileData[0].name);
    }

    if (this.type === 'new') {
      this.userService.postUser(uploadData).subscribe(
        (ret: any) => {
          this.loading = false;
          if (ret.id) {
            this.selectedUser = ret;
            this.filesControl.setValue([]);
            this.createForm();
            this.success = true;
            this.message = 'Usuário cadastrado com sucesso.';
          } else {
            const message = ret.message ? ret.message : '';
            this.genericMessageError(message);
          }
        }, (erro: any) => {
          this.genericMessageError();
        }
      );
    } else {
      this.userService.putUser(uploadData).subscribe(
        (ret: any) => {
          this.loading = false;
          if (ret.id) {
                this.selectedUser = ret;
                this.filesControl.setValue([]);
                this.setUser(ret);
                this.success = true;
                this.message = 'Alteração realizada com sucesso.';
          } else {
            const message = ret.message ? ret.message : '';
            this.genericMessageError(message);
          }
        }, (erro: any) => {
          this.genericMessageError();
        }
      );
    }
  }

  genericMessageError(message: string = '') {
    this.loading = false;
    this.message = message ? message : 'Ops! Ocorreu algum erro.';
    this.erroEnvio = true;
  }

  setUser(u: any) {
    this.type = 'edit';
    this.user.id = u.id;
    this.user.firstname = u.firstname;
    this.user.lastname = u.lastname;
    this.user.email = u.email;
    this.user.phone = u.phone;
    this.user.enabled = u.enabled;
    this.user.level = u.access_level;
    this.isChecked = u.enabled;
    this.createForm();
  }

  openChangePass() {
    this.success = false;
    this.erroEnvio = false;
    this.loading = false;
    this.openedChangePass = !this.openedChangePass;

    if (this.openedChangePass) {
      this.createFormNewPass();
    }
  }

  submitChangePass() {
    this.success = false;
    this.erroEnvio = false;
    this.loading = true;
    const oldPassword = this.formChangePass.get('oldPassword').value;
    const newPassword = this.formChangePass.get('password').value;
    const repeatNewPassword = this.formChangePass.get('repeatPassword').value;

    if (newPassword !== repeatNewPassword) {
      this.loading = false;
      this.message = 'As senhas não conferem.';
      this.erroEnvio = true;
      return false;
    } else {
      this.loginService.setLogin(this.selectedUser.email, oldPassword).subscribe(
        (ret: any) => {

          if (ret.token) {
            sessionStorage.setItem('scToken', ret.token);
          } else {
            this.loading = false;
            this.message = 'A senha atual está incorreta';
            this.erroEnvio = true;
            return false;
          }

          const uploadData = new FormData();
          uploadData.append('id', this.selectedUser.id.toString());
          uploadData.append('level', this.selectedUser.access_level.toString());
          uploadData.append('enabled', this.selectedUser.enabled.toString());
          uploadData.append('firstname', this.selectedUser.firstname);
          uploadData.append('lastname', this.selectedUser.lastname);
          uploadData.append('email', this.selectedUser.email);
          uploadData.append('phone', this.selectedUser.phone);
          uploadData.append('password', newPassword);
          this.userService.putUser(uploadData).subscribe(
            (ret2: any) => {
              if (ret2.id) {
                this.success = true;
                this.message = 'Senha alterada com sucesso.';
              }
              this.loading = false;
            }
          );

        }
       );
    }
  }

}
