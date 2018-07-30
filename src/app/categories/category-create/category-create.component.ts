import { Component, EventEmitter, Output } from '@angular/core';

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

  onAddCategory() {
    const category: Category = {
      title: this.enteredTitle,
      budgetPercent: this.enteredPercent,
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
