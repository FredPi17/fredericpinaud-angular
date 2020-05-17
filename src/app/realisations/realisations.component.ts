import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CvService } from '../services/cv.service';
import { RealisationsService } from '../services/realisations.service';
import { Realisations, RealisationsTypes, RealisationsCategories } from '../models/realisations';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-realisations',
  templateUrl: './realisations.component.html',
  styles:
    ['@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"; '],
  styleUrls: ['./realisations.component.css']
})
export class RealisationsComponent implements OnInit {

  realTypes = ['Bois', '3D','Setup'];
  realCat = ['Web', 'Liens', 'Hobbies'];
  realisations?: Realisations[];
  Types?: RealisationsTypes[];
  Categories?: RealisationsCategories[];
  realForm: FormGroup;
  realTypeForm: FormGroup;
  realCatForm: FormGroup;
  realList?: Realisations[];
  fileUrl: string;
  fileUploaded = false;
  fileIsUploading = false;

  newType: boolean = false;
  newTypeMessage: string = '';
  errorType: boolean = false;
  errorTypeMessage: string = '';

  newCat: boolean = false;
  newCatMessage: string = '';
  errorCat: boolean = false;
  errorCatMessage: string = '';

  newRealisation: boolean = false;
  newRealisationMessage: string = '';
  newRealisationError: boolean = false;
  newRealisationErrorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private RealService: RealisationsService) { }

  ngOnInit(): void {
    this.getAll();
    this.initForm();
  }

  getAll() {
    // @ts-ignore
    this.RealService.getCategories().subscribe((res: HttpResponse<RealisationsCategories[]>) => (this.Categories = res.body.data));
    // @ts-ignore
    this.RealService.getTypes().subscribe((res: HttpResponse<RealisationsTypes[]>) => (this.Types = res.body.data));
    // @ts-ignore
    this.RealService.getRealisations().subscribe((res: HttpResponse<Realisations[]>) => (this.realisations = res.body.data));
  }

  getTypes() {
    // @ts-ignore
    this.RealService.getTypes().subscribe((res: HttpResponse<RealisationsTypes[]>) => (this.Types = res.body.data));
  }

  getCategories() {
    // @ts-ignore
    this.RealService.getCategories().subscribe((res: HttpResponse<RealisationsCategories[]>) => (this.Categories = res.body.data));
  }

  getRealisations() {
    this.RealService.getRealisations().subscribe((res: HttpResponse<Realisations[]>) => {
      // @ts-ignore
      console.log(res.body.data);
      // @ts-ignore
      this.realisations = res.body.data;
    });
  }

  initForm() {
    this.realForm = this.formBuilder.group(
      {
        type: [''],
        titre: ['', [Validators.required]],
        categorie: ['', [Validators.required]],
        image: ['']
      }
    );
    this.realCatForm = this.formBuilder.group(
      {
        nom: ['', Validators.required]
      }
    );
    this.realTypeForm = this.formBuilder.group(
      {
        nom: ['', Validators.required]
      }
    );
  }

  resetVariables() {
    this.newCat = false;
    this.newCatMessage = '';
    this.newCat
    this.errorCat = false;
    this.errorCatMessage = '';
    this.errorType = false;
    this.errorTypeMessage = '';
    this.newRealisation = false;
    this.newRealisationMessage = '';
    this.newRealisationError = false;
    this.newRealisationErrorMessage = '';
  }

  onSubmit() {
    this.resetVariables();
    const type = this.realForm.get('type').value;
    const titre = this.realForm.get('titre').value;
    const categorie = this.realForm.get('categorie').value;
    const image = this.fileUrl;
    this.RealService.newRealisation(type, titre, categorie, image).subscribe((res: HttpResponse<Realisations>) => {
      if (res.body.status == "success") {
        this.newRealisation = true;
        this.newRealisationMessage = 'Nouvelle réalisation créée !';
        setTimeout(() => this.newRealisation = false, 3000);
        this.getRealisations();
      }
      else if (res.body.status == "error") {
        this.newRealisationError = true;
        this.newRealisationErrorMessage = res.body.message;
        setTimeout(() => this.newRealisationError = false, 3000);
      }
    });
  }

  onSubmitCat() {
    this.resetVariables();
    const name = this.realCatForm.get('nom').value;
    this.RealService.newCategory(name).subscribe((res: HttpResponse<RealisationsTypes>) => {
      if (res.body.status == "success") {
        this.newCat = true;
        this.newCatMessage = 'Nouvelle catégorie créée !';
        setTimeout(() => this.newCat = false, 2000);
        this.getCategories();
      }
      else if (res.body.status == "error") {
        this.errorCat = true;
        this.errorCatMessage = res.body.message;
        setTimeout(() => this.errorCat = false, 3000);
      }
    });
  }

  onSubmitType() {
    this.resetVariables();    
    const name = this.realTypeForm.get('nom').value;
    this.RealService.newType(name).subscribe((res: HttpResponse<RealisationsTypes>) => {
      if (res.body.status == "success") {
        this.newType = true;
        this.newTypeMessage = "Nouveau type crée !"
        setTimeout(() => this.newType = false, 3000);
        this.getTypes();
      }
      else if (res.body.status == "error") {
        this.errorType = true;
        this.errorTypeMessage = res.body.message;
        setTimeout(() => this.errorType = false, 3000);
      }
    });
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    // @ts-ignore
    this.RealService.uploadFile(file).then(
        (url: string) => {
            this.fileUrl = url;
            this.fileIsUploading = false;
            this.fileUploaded = true;
        }
    );
}

detectFile(event) {
    this.onUploadFile(event.target.files[0]);
}


}
