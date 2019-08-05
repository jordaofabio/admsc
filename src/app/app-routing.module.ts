import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  { path: 'users', loadChildren: './users/users.module#UsersModule'},
  { path: 'users/new', loadChildren: './users/users.module#UsersModule'},
  { path: 'users/edit/:idUser', loadChildren: './users/users.module#UsersModule'},
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
