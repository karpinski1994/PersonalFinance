import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CategoriesService } from '../categories.service';
import { Category } from '../category.model';


@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit, OnDestroy {
  enteredTitle = '';
  enteredPercent = 0;
  availablePercent: number;
  private percentSub: Subscription;
  private mode = 'create';
  private categoryId: string;
  category: Category;

  constructor(public catServ: CategoriesService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if (paramMap.has('categoryId')) {
        console.log('from if statement');
        this.mode = 'edit';
        this.categoryId = paramMap.get('categoryId');
        this.category = this.catServ.getCategory(this.categoryId);
        console.log(this.categoryId);
      } else {
        this.mode = 'create';
        this.categoryId = null;
      }
    });
  }

  onSaveCategory(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.catServ.addCategory(form.value.enteredTitle, form.value.enteredPercent);
    } else {
      this.catServ.updateCategory(this.categoryId, form.value.enteredTitle, form.value.enteredPercent);
    }

    form.resetForm();
  }



  // For slider
  pickPercent(event) {
    this.enteredPercent = event.value;
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 0) {
      return value + '%';
    }

    return value;
  }

  ngOnDestroy() {
    // this.percentSub.unsubscribe();
  }
}
