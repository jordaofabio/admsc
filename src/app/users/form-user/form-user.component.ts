import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  user: User;
  formUser: FormGroup;

  constructor(private userService: UsersService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.user = new User();
    this.createForm(this.user);
  }

  createForm(user: User) {
    this.formUser = this.formBuilder.group({
      name: [user.name, [Validators.required]],
      email: [user.email, [Validators.email]],
      password: [user.password, [Validators.required]],
      phone: [user.phone, [Validators.maxLength(50)]],
      level: [user.level]
    });
  }

  enviar() {
    const contForm = this.formUser;
    debugger;
  }

}
