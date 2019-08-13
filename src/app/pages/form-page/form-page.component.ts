import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Page } from 'src/app/models/page.model';
import { FileUploadValidators, FileUploadControl } from '@iplab/ngx-file-upload';
import { HttpClient } from '@angular/common/http';
import { AccessLevelsService } from 'src/app/services/access-levels.service';
import { AccessLevel } from 'src/app/models/access-level.model';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {
  public model = {
    editorData: '<p>Hello, world!</p>'
};
  page: Page;
  formPage: FormGroup;
  private filesControl: FormControl = new FormControl(null, FileUploadValidators.filesLimit(1));
  fileData: File;
  levels: AccessLevel[];
  idPage: number;
  type = 'new';
  isChecked = true;

  public editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '400px',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'no',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Insira o conteúdo aqui...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'http://localhost:3000/media',
    sanitize: true,
    toolbarPosition: 'top',
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
    this.filesControl = new FormControl(null, FileUploadValidators.filesLimit(1));
    this.formPage = this.formBuilder.group({
      id: [this.page.id],
      title: [this.page.title, [Validators.required]],
      content: [this.page.content, [Validators.required]],
      summary: [this.page.summary, [Validators.maxLength(50)]],
    });
    this.page.content = this.type === 'new' ? '' : this.page.content;
  }


  onSubmit(): void {

    const preparePage = {...this.formPage.value, content: this.page.content };
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
    this.page.content = p.content;
    this.createForm();
  }

}
