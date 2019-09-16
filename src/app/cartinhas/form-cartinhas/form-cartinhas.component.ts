import { Component, OnInit } from '@angular/core';
import { Cartinha } from 'src/app/models/cartinha.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { AccessLevel } from 'src/app/models/access-level.model';
import { CartinhasService } from 'src/app/services/cartinhas.service';
import { ActivatedRoute } from '@angular/router';
import { AccessLevelsService } from 'src/app/services/access-levels.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-cartinhas',
  templateUrl: './form-cartinhas.component.html',
  styleUrls: ['./form-cartinhas.component.scss']
})
export class FormCartinhasComponent implements OnInit {

  cartinha: Cartinha;
  formCartinha: FormGroup;
  private filesControl: FormControl = new FormControl(null, FileUploadValidators.filesLimit(1));
  fileData: File;
  levels: AccessLevel[];
  idCartinha: number;
  type = 'new';
  success = false;
  erroEnvio = false;
  loading = false;
  message: string;
  linkImgCartinha: string;
  fotoCartinha: string;
  imgLightBox: string;
  lightBoxOpened = false;

  constructor(private http: HttpClient,
              private cartinhaService: CartinhasService,
              private route: ActivatedRoute,
              private accesLevelsService: AccessLevelsService,
              private formBuilder: FormBuilder) {
      this.createForm();

   }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('idCartinha')) {
      this.idCartinha = parseInt(this.route.snapshot.paramMap.get('idCartinha'), 10);
      this.cartinhaService.getCartinha(this.idCartinha).subscribe((u: any) => {
        this.setCartinha(u);
      });
    }
  }

  createForm() {
    this.cartinha = !this.cartinha ? new Cartinha() : this.cartinha;
    this.filesControl = new FormControl(null, FileUploadValidators.filesLimit(1));
    this.formCartinha = this.formBuilder.group({
      id: [this.cartinha.id],
      crianca: [this.cartinha.crianca, [Validators.required]],
      codigoCrianca: [this.cartinha.codigoCrianca, [Validators.required]],
      presente: [this.cartinha.presente, [Validators.required]],
      instituicao: this.cartinha.instituicao,
      img: this.filesControl,
      texto: this.cartinha.texto,
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.erroEnvio = false;
    this.success = false;
    const uploadData = new FormData();
    uploadData.append('id', this.formCartinha.get('id').value);
    uploadData.append('crianca', this.formCartinha.get('crianca').value);
    uploadData.append('codigoCrianca', this.formCartinha.get('codigoCrianca').value);
    uploadData.append('instituicao', this.formCartinha.get('instituicao').value);
    uploadData.append('texto', this.formCartinha.get('texto').value);
    uploadData.append('presente', this.formCartinha.get('presente').value);

    if (this.formCartinha.get('img').value && this.formCartinha.get('img').value.length > 0) {
      this.fileData = this.formCartinha.get('img').value;
      uploadData.append('img', this.fileData[0], this.fileData[0].name);
    }

    if (this.type === 'new') {
      this.cartinhaService.postCartinha(uploadData).subscribe(
        (ret: any) => {
          this.loading = false;

          if (ret.id) {
            this.filesControl.setValue([]);
            this.createForm();
            this.success = true;
            this.message = 'Cartinha cadastrada com sucesso.';
          } else {
            this.erroEnvio = true;
            this.message = 'Ocorreu um erro no cadastro da cartinha.';
          }
        }
      );
    } else {
      this.cartinhaService.putCartinha(uploadData).subscribe(
        (ret: any) => {
          this.loading = false;

          if (ret.id) {
            this.filesControl.setValue([]);
            this.setCartinha(ret);
            this.success = true;
            this.message = 'Cartinha editada com sucesso.';
          } else {
            this.message = 'Ocorreu um erro na edição da cartinha.';
            this.erroEnvio = true;
          }
        }
      );
    }
  }

  setCartinha(c: any) {
    this.type = 'edit';
    this.cartinha.id = c.id;
    this.cartinha.crianca = c.crianca;
    this.cartinha.codigoCrianca = c.codigoCrianca;
    this.cartinha.instituicao = c.instituicao;
    this.cartinha.texto = c.texto;
    this.cartinha.presente = c.presente;
    this.linkImgCartinha = `${environment.PATH_CARTINHAS}/${c.img}`;
    this.fotoCartinha = `${c.img}`;
    this.createForm();
  }





  LightBox(img: string = '') {
    this.imgLightBox = img;
    this.lightBoxOpened = !img ? false : true;
  }

}
