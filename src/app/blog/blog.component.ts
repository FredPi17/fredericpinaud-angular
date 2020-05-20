import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RealisationsService } from '../services/realisations.service';
import { HttpResponse } from '@angular/common/http';
import { RealisationsCategories } from '../models/realisations';
import { BlogService } from '../services/blog.service';
import { BlogKeywords } from '../models/blog';
declare var $ :any;
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styles:
  ['@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"; '],
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  form: FormGroup;
  public editorConfig: string = 'My Document !';
  categories: RealisationsCategories[];
  keywords: BlogKeywords[];

  public options: Object = {
    toolbarInline: false,
    toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize', '|', 'paragraphFormat', 'align', 'undo', 'redo', 'html', 'alert'],    
    charCounterCount: true
}

  constructor(private formBuilder: FormBuilder, 
    private realService: RealisationsService,
    private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getKeywords().subscribe((res: HttpResponse<BlogKeywords[]>) => {
      console.log(res.body);
      // @ts-ignore
      this.keywords = res.body.data;
    })
    this.realService.getCategories().subscribe((res: HttpResponse<RealisationsCategories[]>) => {
      console.log(res.body);
        // @ts-ignore
        this.categories = res.body.data;
    })
    this.initForm();
  }

  onSubmit() {
    console.log(this.form.value);
  }

  initForm() {
    this.form = this.formBuilder.group(
      {
        description: ['', Validators.required],
        titre: ['', Validators.required],
        categorie: ['', Validators.required],
        keywords: ['', Validators.required]
      });
  }
}
