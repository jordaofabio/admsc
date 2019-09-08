import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  { path: 'users', loadChildren: './users/users.module#UsersModule'},
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule'},
  { path: 'posts', loadChildren: './posts/posts.module#PostsModule'},
  { path: 'cartinhas', loadChildren: './cartinhas/cartinhas.module#CartinhasModule'},
  { path: 'login', loadChildren: './login/login.module#LoginModule'},
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
