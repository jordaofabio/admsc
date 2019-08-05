import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User, ConfirmUser } from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  confirmUser: ConfirmUser;
  hideModal = true;
  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.confirmUser = new ConfirmUser();
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((ret: any) => {
      this.users = ret.rows;
    });
  }


  Confirm(user: User) {
    this.hideModal = false;
    this.confirmUser = new ConfirmUser();
    this.confirmUser = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      photo: user.photo
    };
  }

  deleteUser() {
    this.userService.deleteUser(this.confirmUser.id).subscribe(
      (ret: any) => {
        this.hideModal = true;
        this.users.splice(this.users.findIndex(x => x.id === this.confirmUser.id), 1);
      }
    );
  }

}
