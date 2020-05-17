import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-cv',
    templateUrl: './cv.component.html',
    styleUrls: ['./cv.component.css']
})

export class CvComponent implements OnInit {

    contactForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.contactForm = this.formBuilder.group(
            {
                name: ['', [Validators.required, Validators.name]],
                email: ['', [Validators.required, Validators.email]],
                subject: ['', [Validators.required, Validators.minLength(5)]],
                message: ['', [Validators.required, Validators.minLength(10)]]
            }
        );
    }
}
