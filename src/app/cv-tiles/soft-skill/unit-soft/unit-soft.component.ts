import {Component, OnInit} from '@angular/core';
import {Formation} from '../../../models/formation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SoftSkill, SoftType} from '../../../models/soft-skill';
import {CvService} from '../../../services/cv.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-unit-soft',
  templateUrl: './unit-soft.component.html',
  styles:
    ['@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"; '],
  styleUrls: ['./unit-soft.component.css']
})
export class UnitSoftComponent implements OnInit {
  soft: SoftSkill;
  softType: SoftType[];
  softForm: FormGroup;

  constructor(private formBuilder: FormBuilder, protected cvService: CvService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.cvService.getSoftSkillById(id).subscribe((res: HttpResponse<SoftSkill>) => (this.soft = res.body));
    this.cvService.getSoftTypes().subscribe((res: HttpResponse<SoftType[]>) => (this.softType = res.body));
    this.initForm();
  }

  initForm() {
    this.softForm = this.formBuilder.group(
      {
        type: [''],
        titre: ['', [Validators.required]],
        pourcentage: ['', [Validators.required]]
      }
    );
  }

  onSubmit() {
    const type = this.softForm.get('type').value;
    const titre = this.softForm.get('titre').value;
    const pourcentage = this.softForm.get('pourcentage').value;
    const id = this.route.snapshot.params.id;
    this.cvService.updateSoftSkill(type, titre, pourcentage, id).subscribe(
      (res: HttpResponse<string>) => (this.router.navigate(['/admin', 'cv'])));
  }

  deleteSoft(id) {
    this.cvService.deleteSoftSkill(id).subscribe((res: HttpResponse<string>) => (this.router.navigate(['/admin', 'cv'])));
  }
}
