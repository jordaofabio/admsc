import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewpassRoutingModule } from './newpass-routing.module';
import { NewpassComponent } from './newpass.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NewpassComponent],
  imports: [
    CommonModule,
    NewpassRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NewpassModule { }
