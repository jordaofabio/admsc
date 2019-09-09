import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartinhasRoutingModule } from './cartinhas-routing.module';
import { CartinhasComponent } from './cartinhas.component';
import { FormCartinhasComponent } from './form-cartinhas/form-cartinhas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';


@NgModule({
  declarations: [CartinhasComponent, FormCartinhasComponent],
  imports: [
    CommonModule,
    CartinhasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
  ]
})
export class CartinhasModule { }
