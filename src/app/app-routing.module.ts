import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
  { path: 'users', loadChildren: './users/users.module#UsersModule', canActivate: [AuthGuard]},
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule', canActivate: [AuthGuard]},
  { path: 'posts', loadChildren: './posts/posts.module#PostsModule', canActivate: [AuthGuard]},
  { path: 'cartinhas', loadChildren: './cartinhas/cartinhas.module#CartinhasModule', canActivate: [AuthGuard]},
  { path: 'login', loadChildren: './login/login.module#LoginModule'},
  { path: 'newpass', loadChildren: './newpass/newpass.module#NewpassModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, {
//       enableTracing: false,
//       scrollPositionRestoration: 'enabled',
//       anchorScrolling: 'enabled',
//       onSameUrlNavigation: 'reload',
//       useHash: false
//     })
//   ],
//   exports: [RouterModule]
// })
export class AppRoutingModule { }
