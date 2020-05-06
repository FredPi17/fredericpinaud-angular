import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CvService} from '../../services/cv.service';
import {HttpResponse} from '@angular/common/http';
import {SoftSkill, SoftType} from '../../models/soft-skill';

@Component({
  selector: 'app-soft-skill',
  templateUrl: './soft-skill.component.html',
  styleUrls: ['./soft-skill.component.css']
})
export class SoftSkillComponent implements OnInit {
  softForm: FormGroup;
  softTypeForm: FormGroup;
  softTypes: SoftType[];
  softSkills?: SoftSkill[];

  constructor(private formBuilder: FormBuilder,
              private cvService: CvService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getSoftTypes();
    this.getSoftSkillList();
  }

  initForm() {
    this.softForm = this.formBuilder.group(
      {
        type: [''],
        titre: ['', [Validators.required]],
        pourcentage: ['', [Validators.required]]
      }
    );

    this.softTypeForm = this.formBuilder.group(
      {
        nom: ['', [Validators.required]]
      }
    );
  }

  getSoftTypes() {
    this.cvService.getSoftTypes().subscribe((res: HttpResponse<SoftType[]>) => (this.softTypes = res.body));
  }

  getSoftSkillList() {
    this.cvService.getSoftSkillList().subscribe((res: HttpResponse<SoftSkill[]>) => (this.softSkills = res.body));
  }

  onSubmit() {
    const type = this.softForm.get('type').value;
    const titre = this.softForm.get('titre').value;
    const pourcentage = this.softForm.get('pourcentage').value;
    this.cvService.newSoftSkill(type, titre, pourcentage).subscribe(
      (res: HttpResponse<string>) => (this.getSoftSkillList()));
  }

  onSubmitType() {
    const name = this.softTypeForm.get('nom').value;
    this.cvService.newSoftType(name).subscribe((res: HttpResponse<string>) => (this.getSoftTypes()));
  }

}
