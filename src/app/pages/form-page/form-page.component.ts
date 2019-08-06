import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Page } from 'src/app/models/page.model';
import { FileUploadValidators, FileUploadControl } from '@iplab/ngx-file-upload';
import { HttpClient } from '@angular/common/http';
import { AccessLevelsService } from 'src/app/services/access-levels.service';
import { AccessLevel } from 'src/app/models/access-level.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {

  page: Page;
  formPage: FormGroup;
  private filesControl: FormControl = new FormControl(null, FileUploadValidators.filesLimit(1));
  fileData: File;
  levels: AccessLevel[];
  idPage: number;
  type = 'new';
  isChecked = true;

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
      this.pageService.getPage(this.idPage).subscribe((p: any) => {
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
  }

  onSubmit(): void {
    const uploadData = new FormData();
    uploadData.append('id', this.formPage.get('id').value);
    uploadData.append('title', this.formPage.get('title').value);
    uploadData.append('summary', this.formPage.get('summary').value);
    uploadData.append('content', this.formPage.get('content').value);

    if (this.type === 'new') {
      this.pageService.postPage(uploadData).subscribe(
        (ret: any) => {
          this.filesControl.setValue([]);
          this.createForm();
        }
      );
    } else {
      this.pageService.putPage(uploadData).subscribe(
        (ret: any) => {
          console.log(ret);
          this.filesControl.setValue([]);
          this.setPage(ret);
        }
      );
    }
  }

  setPage(p: any) {
    this.type = 'edit';
    this.page.id = p.id;
    this.page.title = p.title;
    this.page.summary = p.summary;
    this.page.content = p.content;
    this.createForm();
  }

}
