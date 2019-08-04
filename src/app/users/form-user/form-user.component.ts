import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadValidators, FileUploadControl } from '@iplab/ngx-file-upload';
import { HttpClient } from '@angular/common/http';
import { AccessLevelsService } from 'src/app/services/access-levels.service';
import { AccessLevel } from 'src/app/models/access-level.model';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  user: User;
  formUser: FormGroup;
  private filesControl: FormControl = new FormControl(null, FileUploadValidators.filesLimit(1));
  fileData: File;
  levels: AccessLevel[];

  constructor(private http: HttpClient,
              private userService: UsersService,
              private accesLevelsService: AccessLevelsService,
              private formBuilder: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
    this.accesLevelsService.getLevels().subscribe((x: AccessLevel[]) => this.levels = x);
  }

  createForm() {
    this.user = new User();
    this.filesControl = new FormControl(null, FileUploadValidators.filesLimit(1));
    this.formUser = this.formBuilder.group({
      id: [this.user.id],
      firstname: [this.user.firstname, [Validators.required]],
      lastname: [this.user.lastname, [Validators.required]],
      email: [this.user.email, [Validators.email]],
      password: [this.user.password, [Validators.required]],
      phone: [this.user.phone, [Validators.maxLength(50)]],
      photo: this.filesControl,
      level: [this.user.level, [Validators.required]],
      enabled: [this.user.enabled]
    });
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
    this.fileData = this.formUser.get('photo').value;
    uploadData.append('id', this.formUser.get('id').value);
    uploadData.append('firstname', this.formUser.get('firstname').value);
    uploadData.append('lastname', this.formUser.get('lastname').value);
    uploadData.append('email', this.formUser.get('email').value);
    uploadData.append('phone', this.formUser.get('phone').value);
    uploadData.append('password', this.formUser.get('password').value);
    uploadData.append('level', this.formUser.get('level').value);
    uploadData.append('photo', this.fileData[0], this.fileData[0].name);
    uploadData.append('enabled', this.formUser.get('enabled').value);

    this.userService.postUser(uploadData).subscribe(
      (ret: any) => {
        console.log(ret);
        this.filesControl.setValue([]);
        this.createForm();

      }
    );
  }

}
