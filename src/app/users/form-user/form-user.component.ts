import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadValidators, FileUploadControl } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  user: User;
  formUser: FormGroup;
  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(2));

  constructor(private userService: UsersService, private formBuilder: FormBuilder) {
    this.user = new User();

    this.formUser = this.formBuilder.group({
      firstname: [this.user.firstname, [Validators.required]],
      lastname: [this.user.lastname, [Validators.required]],
      email: [this.user.email, [Validators.email]],
      password: [this.user.password, [Validators.required]],
      phone: [this.user.phone, [Validators.maxLength(50)]],
      photo: this.filesControl,
      level: [this.user.level]
    });
   }

  ngOnInit() {
    this.createForm(this.user);
  }

  createForm(user: User) {

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
    // const uploadData = new User();
    // uploadData.firstname = this.formUser.get('firstname').value;
    // uploadData.lastname = this.formUser.get('lastname').value;
    // uploadData.email = this.formUser.get('email').value;
    // uploadData.phone = this.formUser.get('phone').value;
    // uploadData.level = this.formUser.get('level').value;
    // uploadData.photo = this.formUser.get('photo').value;

    this.userService.postUser(this.formUser).subscribe(
      (ret: any) => {
        console.log(ret);
        debugger;

      }
    );
  }

  enviar() {
    const contForm = this.formUser;
    debugger;
  }

}
