import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {
  enteredTitle = '';
  enteredPercent = 0;

  constructor( public catServ: CategoriesService) {}

  onAddCategory(form: NgForm) {
      if (form.invalid) {
      return;
    }

    this.catServ.addCategory(form.value.enteredTitle, form.value.enteredPercent);
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
}
