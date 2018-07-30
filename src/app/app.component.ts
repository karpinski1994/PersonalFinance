import { Component } from '@angular/core';

import { Category } from './categories/category.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  categories: Array<Category> = [];

  onCategoryAdded(category: Category) {
    this.categories.push(category);
  }
}
