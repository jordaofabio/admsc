import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { FormUserComponent } from './form-user/form-user.component';


const routes: Routes = [
  { path: '', children: [
    { path: '', component: UsersComponent },
    { path: 'new', component: FormUserComponent },
    { path: 'edit/:idUser', component: FormUserComponent},
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
