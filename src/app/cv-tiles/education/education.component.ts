import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CvService} from '../../services/cv.service';
import {HttpResponse} from '@angular/common/http';
import {Formation} from '../../models/formation';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  educationForm: FormGroup;
  formations?: Formation[];

  constructor(private formBuilder: FormBuilder,
              private cvService: CvService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getEducations();
  }

  initForm() {
    this.educationForm = this.formBuilder.group(
      {
        date_debut: ['', [Validators.required]],
        date_fin: ['', [Validators.required]],
        titre: ['', [Validators.required]],
        lieu: [''],
        description: ['', [Validators.required]]
      }
    );
  }

  getEducations() {
    this.cvService.getEducationList().subscribe((res: HttpResponse<Formation[]>) => (this.formations = res.body));
  }

  onSubmit() {
    const dateDebut = this.educationForm.get('date_debut').value;
    const dateFin = this.educationForm.get('date_fin').value;
    const titre = this.educationForm.get('titre').value;
    const lieu = this.educationForm.get('lieu').value;
    const description = this.educationForm.get('description').value;
    this.cvService.newFormation(dateDebut, dateFin, titre, lieu, description).subscribe(
      (res: HttpResponse<string>) => (window.location.reload()));
  }
}
