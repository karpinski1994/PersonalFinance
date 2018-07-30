import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../category.model';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {
  enteredTitle = '';
  enteredPercent = 0;
  @Output() categoryCreated = new EventEmitter();

  onAddCategory(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const category: Category = {
      title: form.value.enteredTitle,
      budgetPercent: form.value.enteredPercent,
      outcomesList: []
    };

    this.categoryCreated.emit(category);
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
