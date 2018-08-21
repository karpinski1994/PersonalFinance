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
  isLoading = false;
  private percentSub: Subscription;
  private mode = 'create';
  private categoryId: string;
  category: Category;

  constructor(public catServ: CategoriesService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if (paramMap.has('categoryId')) {
        this.mode = 'edit';
        this.categoryId = paramMap.get('categoryId');
        this.isLoading = true;
         this.catServ.getCategory(this.categoryId).subscribe(categoryData => {
           this.isLoading = false;
           this.category = {
              id: categoryData._id,
              title: categoryData.title,
              budgetPercent: categoryData.budgetPercent,
              outcomesList: Array<{}>()
            };
         });
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
    this.isLoading = true;
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
