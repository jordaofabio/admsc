import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartinhasComponent } from './cartinhas.component';
import { FormCartinhasComponent } from './form-cartinhas/form-cartinhas.component';


const routes: Routes = [{
  path: '', children: [
    {path: '', component: CartinhasComponent },
    { path: 'new', component: FormCartinhasComponent },
    { path: 'edit/:idCartinha', component: FormCartinhasComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartinhasRoutingModule { }
