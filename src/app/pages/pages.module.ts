import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { FormPageComponent } from './form-page/form-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [PagesComponent, FormPageComponent],
  imports: [
    HttpClientModule,
    AngularEditorModule,
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
  ]
})

export class PagesModule { }
