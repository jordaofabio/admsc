import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { FormPageComponent } from './form-page/form-page.component';


const routes: Routes = [{
  path: '', children: [
    {path: '', component: PagesComponent },
    { path: 'new', component: FormPageComponent },
    { path: 'edit/:idPage', component: FormPageComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
