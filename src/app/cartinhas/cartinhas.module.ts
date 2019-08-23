import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartinhasRoutingModule } from './cartinhas-routing.module';
import { CartinhasComponent } from './cartinhas.component';
import { FormCartinhasComponent } from './form-cartinhas/form-cartinhas.component';


@NgModule({
  declarations: [CartinhasComponent, FormCartinhasComponent],
  imports: [
    CommonModule,
    CartinhasRoutingModule
  ]
})
export class CartinhasModule { }
