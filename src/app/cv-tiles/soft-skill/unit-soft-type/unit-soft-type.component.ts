import {Component, OnInit} from '@angular/core';
import {CvService} from '../../../services/cv.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {SoftType} from '../../../models/soft-skill';

@Component({
  selector: 'app-soft-type',
  templateUrl: './unit-soft-type.component.html',
  styles:
    ['@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"; '],
  styleUrls: ['./unit-soft-type.component.css']
})
export class UnitSoftTypeComponent implements OnInit {
  softTypeForm: FormGroup;
  types: SoftType;

  constructor(private formBuilder: FormBuilder, protected cvService: CvService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.cvService.getSoftSkillsTypeByIdById(id).subscribe((res: HttpResponse<SoftType>) => (this.types = res.body));
    console.log(this.types);
    this.initForm();
  }

  initForm() {
    this.softTypeForm = this.formBuilder.group(
      {
        nom: ['', [Validators.required]]
      }
    );
  }

  onSubmit() {
    const nom = this.softTypeForm.get('nom').value;
    const id = this.route.snapshot.params.id;
    this.cvService.updateSoftSkillType(nom, id).subscribe(
      (res: HttpResponse<string>) => (this.router.navigate(['/admin', 'cv'])));
  }

  deleteType(id) {
    this.cvService.deleteSoftSkillTypeById(id).subscribe((res: HttpResponse<string>) => (this.router.navigate(['/admin', 'cv'])));
  }

}
