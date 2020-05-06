import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Skill} from '../../../models/skill';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CvService} from '../../../services/cv.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-unit-skill',
  templateUrl: './unit-skill.component.html',
  styles:
    ['@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"; '],
  styleUrls: ['./unit-skill.component.css']
})
export class UnitSkillComponent implements OnInit {
  skill?: Skill;
  skillForm: FormGroup;

  constructor(private formBuilder: FormBuilder, protected cvService: CvService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.cvService.getSkillById(id).subscribe((res: HttpResponse<Skill>) => (this.skill = res.body));
    this.initForm();
  }

  initForm() {
    this.skillForm = this.formBuilder.group(
      {
        date_debut: ['', [Validators.required]],
        date_fin: ['', [Validators.required]],
        titre: ['', [Validators.required]],
        entreprise: ['', [Validators.required]],
        description: ['', [Validators.required]]
      }
    );
  }

  onSubmit() {
    const dateDebut = this.skillForm.get('date_debut').value;
    const dateFin = this.skillForm.get('date_fin').value;
    const titre = this.skillForm.get('titre').value;
    const entreprise = this.skillForm.get('entreprise').value;
    const description = this.skillForm.get('description').value;
    const id = this.route.snapshot.params.id;
    this.cvService.updateSkill(dateDebut, dateFin, titre, entreprise, description, id).subscribe(
      (res: HttpResponse<string>) => (this.router.navigate(['/admin', 'cv'])));
  }

  deleteSkill(id) {
    this.cvService.deleteSkill(id).subscribe((res: HttpResponse<string>) => (this.router.navigate(['/admin', 'cv'])));
  }
}
