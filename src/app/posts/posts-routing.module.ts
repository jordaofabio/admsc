import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts.component';
import { FormPostComponent } from './form-post/form-post.component';


const routes: Routes = [{
  path: '', children: [
    {path: '', component: PostsComponent },
    { path: 'new', component: FormPostComponent },
    { path: 'edit/:idPost', component: FormPostComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
