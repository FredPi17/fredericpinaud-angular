import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CvService} from '../../services/cv.service';
import {HttpResponse} from '@angular/common/http';
import {Skill} from '../../models/skill';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  skillForm: FormGroup;
  skills: Skill[];

  constructor(private formBuilder: FormBuilder,
              private cvService: CvService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getSkillList();
  }

  initForm() {
    this.skillForm = this.formBuilder.group(
      {
        date_debut: ['', [Validators.required]],
        date_fin: ['', [Validators.required]],
        titre: ['', [Validators.required]],
        entreprise: ['', Validators.required],
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
    this.cvService.newSkill(dateDebut, dateFin, titre, entreprise, description).subscribe(
      (res: HttpResponse<string>) => (this.getSkillList()));
  }

  getSkillList() {
    this.cvService.getSkillList().subscribe((res: HttpResponse<Skill[]>) => (this.skills = res.body));
  }
}
