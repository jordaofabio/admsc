import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadValidators } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  user: User;
  formUser: FormGroup;
  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(2))

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
      photo: [user.photo],
      level: [user.level]
    });
  }

  getBase64(event) {
    debugger;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // me.modelvalue = reader.result;
      console.log(reader.result);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  uploadDocument(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.formUser.get('photo').setValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit(): void {
    const uploadData = new FormData();
    const firstname = this.formUser.get('name').value.split(' ')[0];
    const lastname = this.formUser.get('name').value.substring(firstname.length, this.formUser.get('name').value.length).trim();
    uploadData.append('firstname', firstname);
    uploadData.append('lastname', lastname);
    uploadData.append('email', this.formUser.get('email').value);
    uploadData.append('phone', this.formUser.get('phone').value);
    uploadData.append('level', this.formUser.get('level').value);
    uploadData.append('photo', this.formUser.get('photo').value);
    this.userService.postUser(uploadData);
  }

  enviar() {
    const contForm = this.formUser;
    debugger;
  }

}
