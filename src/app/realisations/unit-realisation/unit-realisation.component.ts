import { Component, OnInit } from '@angular/core';
import { RealisationsTypes, RealisationsCategories, Realisations } from 'src/app/models/realisations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RealisationsService } from 'src/app/services/realisations.service';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, RoutesRecognized, Router } from '@angular/router';
import { filter, pairwise} from 'rxjs/operators';
import { stringify } from 'querystring';

@Component({
  selector: 'app-unit-realisation',
  templateUrl: './unit-realisation.component.html',
  styles:
    ['@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"; '],
  styleUrls: ['./unit-realisation.component.css']
})
export class UnitRealisationComponent implements OnInit {

  realForm: FormGroup;
  Types: RealisationsTypes[];
  Categories: RealisationsCategories[];
  realisation?: Realisations;
  fileIsUploading: boolean = false;
  fileUploaded: boolean = false;
  fileUrl: string = '';

  errorImport: boolean = false;
  errorImportMessage: string = '';

  updateOk?: boolean = false;
  updateMessage: string = '';
  updateError?: boolean = false;
  updateErrorMessage: string = '';

  deleteSuccess: boolean = false;
  deleteSuccessMessage: string = '';
  deleteError: boolean = false;
  deleteErrorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private realService: RealisationsService,
    private route: ActivatedRoute,
    private router: Router) {
    }

  ngOnInit(): void {
    this.initForm();
    this.realService.getRealisationById(this.route.snapshot.params.id).subscribe((res: HttpResponse<Realisations>) => {
      if (res.body.status == "success") {
      // @ts-ignore
      this.realisation = res.body.data;
      }
      else if (res.body.status == "error") {
        this.errorImport = true;
        this.errorImportMessage = res.body.message;
      }
    })
    // @ts-ignore
    this.realService.getCategories().subscribe((res: HttpResponse<RealisationsCategories[]>) => this.Categories = res.body.data);
    // @ts-ignore
    this.realService.getTypes().subscribe((res: HttpResponse<RealisationsTypes[]>) => this.Types = res.body.data);
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
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    // @ts-ignore
    this.realService.uploadFile(file).then(
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

  deleteRealisation(id) {
    this.resetVariables();
    console.log("deleting realisation with id: ", id);
    this.realService.deleteRealisation(id).subscribe((res: HttpResponse<Realisations>) => {
      if(res.body.status == "success") {
        this.deleteSuccess = true;
        this.deleteSuccessMessage = res.body.message;
      }
      else if (res.body.status == "error") {
        this.deleteError = true;
        this.deleteErrorMessage = res.body.message;
        setTimeout(() => {this.deleteError = false, 3000});
      }
    })
  }

  updateRealisation(id) {
    this.resetVariables();
    if (this.fileUrl == "") {
      this.fileUrl = this.realisation.image;
    }
    const titre = this.realForm.get('titre').value;
    const type = this.realForm.get('type').value;
    const categorie = this.realForm.get('categorie').value;
    const image = this.fileUrl;
    this.realService.updateRealisation(titre, type, categorie, image, id).subscribe((res: HttpResponse<Realisations>) => {
      console.log(res.body);
      if (res.body.status == 'success') {
        console.log('update ok: ', res.body)
        // @ts-ignore
        this.realisation = res.body.data;
        this.updateOk = true;
        this.updateMessage = res.body.message;
        setTimeout(()=> {this.updateOk = false, 3000});
      }
      else if (res.body.status == 'error') {
        console.log('update nok: ', res.body)
        this.updateError = true;
        this.updateErrorMessage = res.body.message;
        setTimeout(()=> {this.updateError = false, 3000});
      }
    })
  }

  resetVariables() {
    this.deleteSuccess = false;
    this.deleteSuccess = false;
    this.updateError = false;
    this.updateOk = false;
  }

}
