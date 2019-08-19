import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Page } from 'src/app/models/page.model';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { AccessLevelsService } from 'src/app/services/access-levels.service';
import { AccessLevel } from 'src/app/models/access-level.model';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
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

  page: Page;
  formPage: FormGroup;
  fileData: File;
  levels: AccessLevel[];
  idPage: number;
  type = 'new';

  public Editor = ClassicEditor;
  editorConfig = {
    toolbar: [
    'heading',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    'imageUpload',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo'],
    ckfinder: {
      options: {
        resourceType: 'Images'
      },
      uploadUrl: 'http://localhost:3000/media'
    },
    placeholder: 'Insira o conteúdo da página aqui.',
  };

  constructor(private http: HttpClient,
              private pageService: PagesService,
              private route: ActivatedRoute,
              private accesLevelsService: AccessLevelsService,
              private formBuilder: FormBuilder) {
      this.createForm();
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
    this.formPage = this.formBuilder.group({
      id: [this.page.id],
      title: [this.page.title, [Validators.required]],
      summary: [this.page.summary, [Validators.maxLength(50)]],
    });
    this.page.content = this.type === 'new' ? '' : this.model.content;
  }

  onSubmit(): void {
    const preparePage = {...this.formPage.value, content: this.model.content };
    if (this.type === 'new') {
      this.pageService.postPage(preparePage).subscribe(
        (ret: Page) => {
          this.createForm();
          this.model.content = '';
        }
      );
    } else {
      this.pageService.putPage(preparePage).subscribe(
        (ret: any) => {
          this.setPage(ret.page);
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
