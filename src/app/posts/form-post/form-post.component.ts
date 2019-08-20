import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { AccessLevelsService } from 'src/app/services/access-levels.service';
import { AccessLevel } from 'src/app/models/access-level.model';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-form-post',
  templateUrl: './form-post.component.html',
  styleUrls: ['./form-post.component.scss']
})
export class FormPostComponent implements OnInit {

  public model = {
    content: ''
  };

  post: Post;
  categories: Category[];
  formPost: FormGroup;
  fileData: File;
  levels: AccessLevel[];
  idPost: number;
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
              private postService: PostsService,
              private categoriesService: CategoriesService,
              private route: ActivatedRoute,
              private accesLevelsService: AccessLevelsService,
              private formBuilder: FormBuilder) {
      this.createForm();
   }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('idPost')) {
      this.idPost = parseInt(this.route.snapshot.paramMap.get('idPost'), 10);
      this.postService.getPost(this.idPost).subscribe((p: Post) => {
        this.setPost(p);
      });
    }
    this.accesLevelsService.getLevels().subscribe((x: AccessLevel[]) => this.levels = x);
    this.categoriesService.getCategories().subscribe((c: Category[]) => this.categories = c);

  }

  createForm() {
    this.post = !this.post ? new Post() : this.post;
    this.formPost = this.formBuilder.group({
      id: [this.post.id],
      title: [this.post.title, [Validators.required]],
      categories: [this.post.categories, [Validators.required]],
      summary: [this.post.summary, [Validators.maxLength(50)]],
    });
    this.post.content = this.type === 'new' ? '' : this.model.content;
  }

  onSubmit(): void {
    const preparePost = {...this.formPost.value, content: this.model.content, author: 5, img: 'teste.jpg' };
    if (this.type === 'new') {
      this.postService.postPost(preparePost).subscribe(
        (ret: Post) => {
          this.createForm();
          this.model.content = '';
        }
      );
    } else {
      this.postService.putPost(preparePost).subscribe(
        (ret: any) => {
          this.setPost(ret.post);
        }
      );
    }
  }

  setPost(p: Post) {
    this.type = 'edit';
    this.post.id = p.id;
    this.post.title = p.title;
    this.post.summary = p.summary;
    this.model.content = p.content;
    this.createForm();
  }
}
