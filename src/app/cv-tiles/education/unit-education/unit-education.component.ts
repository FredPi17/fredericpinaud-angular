import {Component, OnInit} from '@angular/core';
import {CvService} from '../../../services/cv.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Formation} from '../../../models/formation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-unit-education',
    templateUrl: './unit-education.component.html',
    styles:
        ['@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"; '],
    styleUrls: ['./unit-education.component.css']
})
export class UnitEducationComponent implements OnInit {
    formation?: Formation;
    formationForm: FormGroup;

    constructor(private formBuilder: FormBuilder, protected cvService: CvService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.params.id;
        this.cvService.getEducationById(id).subscribe((res: HttpResponse<Formation>) => (this.formation = res.body));
        this.initForm();
    }

    initForm() {
        this.formationForm = this.formBuilder.group(
            {
                date_debut: ['', [Validators.required]],
                date_fin: ['', [Validators.required]],
                titre: ['', [Validators.required]],
                lieu: [''],
                description: ['', [Validators.required]]
            }
        );
    }

    onSubmit() {
        const dateDebut = this.formationForm.get('date_debut').value;
        const dateFin = this.formationForm.get('date_fin').value;
        const titre = this.formationForm.get('titre').value;
        const lieu = this.formationForm.get('lieu').value;
        const description = this.formationForm.get('description').value;
        const id = this.route.snapshot.params.id;
        this.cvService.updateFormation(dateDebut, dateFin, titre, lieu, description, id).subscribe(
            (res: HttpResponse<string>) => (this.router.navigate(['/admin', 'cv'])));
    }

    deleteEducation(id) {
        this.cvService.deleteEducation(id).subscribe((res: HttpResponse<string>) => (this.router.navigate(['/admin', 'cv'])));
    }
}
