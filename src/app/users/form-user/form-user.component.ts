import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadValidators, FileUploadControl } from '@iplab/ngx-file-upload';
import { HttpClient } from '@angular/common/http';
import { AccessLevelsService } from 'src/app/services/access-levels.service';
import { AccessLevel } from 'src/app/models/access-level.model';
import { ActivatedRoute } from '@angular/router';

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
  idUser: number;
  type = 'new';
  isChecked = true;

  constructor(private http: HttpClient,
              private userService: UsersService,
              private route: ActivatedRoute,
              private accesLevelsService: AccessLevelsService,
              private formBuilder: FormBuilder) {
      this.createForm();

   }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('idUser')) {
      this.idUser = parseInt(this.route.snapshot.paramMap.get('idUser'), 10);
      this.userService.getUser(this.idUser).subscribe((u: any) => {
        this.setUser(u);
      });
    }
    this.accesLevelsService.getLevels().subscribe((x: AccessLevel[]) => this.levels = x);
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

  onSubmit(): void {
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
          this.filesControl.setValue([]);
          this.createForm();
        }
      );
    } else {
      this.userService.putUser(uploadData).subscribe(
        (ret: any) => {
          console.log(ret);
          this.filesControl.setValue([]);
          this.setUser(ret);
        }
      );
    }
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

}
