import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Page } from 'src/app/models/page.model';
import { FileUploadValidators, FileUploadControl } from '@iplab/ngx-file-upload';
// import { HttpClient } from '@angular/common/http';
import { AccessLevelsService } from 'src/app/services/access-levels.service';
import { AccessLevel } from 'src/app/models/access-level.model';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import { HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {

  public model = {
    content: ''
  };

  public Editor = ClassicEditor;
  page: Page;
  formPage: FormGroup;
  private filesControl: FormControl = new FormControl(null, FileUploadValidators.filesLimit(1));
  fileData: File;
  levels: AccessLevel[];
  idPage: number;
  type = 'new';
  isChecked = true;

  editorConfig = {
    placeholder: 'Insira o conteúdo da página aqui.',
  };

  constructor(private http: HttpClient,
              private pageService: PagesService,
              private route: ActivatedRoute,
              private accesLevelsService: AccessLevelsService,
              private formBuilder: FormBuilder) {
      this.createForm();

   }



  onReady($event) {
    $event.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      const ret = new UploadAdapter(loader, '', this.http);
      debugger;
      return ret;
    };
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('idPage')) {
      this.idPage = parseInt(this.route.snapshot.paramMap.get('idPage'), 10);
      this.pageService.getPage(this.idPage).subscribe((p: Page) => {
        this.setPage(p);
      });
    }
    this.accesLevelsService.getLevels().subscribe((x: AccessLevel[]) => this.levels = x);

  }

  createForm() {
    this.page = !this.page ? new Page() : this.page;
    this.filesControl = new FormControl(null, FileUploadValidators.filesLimit(1));
    this.formPage = this.formBuilder.group({
      id: [this.page.id],
      title: [this.page.title, [Validators.required]],
      // content: this.model.content,
      summary: [this.page.summary, [Validators.maxLength(50)]],
    });
    // this.page.content = this.type === 'new' ? '' : this.page.content;
  }


  onSubmit(): void {

    const preparePage = {...this.formPage.value, content: this.model.content };
    if (this.type === 'new') {
      this.pageService.postPage(preparePage).subscribe(
        (ret: Page) => {
          this.filesControl.setValue([]);
          this.createForm();
        }
      );
    } else {
      this.pageService.putPage(preparePage).subscribe(
        (ret: any) => {
          console.log(ret);
          this.filesControl.setValue([]);
          this.setPage(ret);
        }
      );
    }
  }

  setPage(p: Page) {
    this.type = 'edit';
    this.page.id = p.id;
    this.page.title = p.title;
    this.page.summary = p.summary;
    this.model.content = p.content;
    this.createForm();
  }

}

export class UploadAdapter {
  constructor(
    private loader,
    public url: string,
    private http: HttpClient
    ) {
  }
// the uploadFile method use to upload image to your server
uploadFile(file, url?: string, user?: string) {
  let name = '';
  url = 'http://localhost:3000/media';
  const formData: FormData = new FormData();
  const headers = new Headers();
  name = file.name;
  formData.append('file', file, name);
  const dotIndex = name.lastIndexOf('.');
  const fileName  = dotIndex > 0 ? name.substring(0, dotIndex) : name;
  formData.append('name', fileName);
  formData.append('source', user);

  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  console.log('formData', formData);
  const params = new HttpParams();
  const options = {
      params,
      reportProgress: true,
  };
// http post return an observer
// so I need to convert to Promise
  return this.http.post(url, formData);
}
// implement the upload
upload() {
    const upload = new Promise((resolve, reject) => {
      this.loader.file.then(
          (data) => {
              this.uploadFile(data, this.url, 'test')
              .subscribe(
                  (result: any) => {
// resolve data formate must like this
// if **default** is missing, you will get an error
                      // ** resolve({ default: result['attachment'] }) **
                      debugger
                      resolve(result);
                  },
                  (error) => {
                      reject(data.msg);
                  }
              );
          }
      );
    });
    return upload;
}
abort() {
    console.log('abort')
}
}
