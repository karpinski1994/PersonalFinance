import { Component, Input } from '@angular/core';

import { Category } from '../category.model';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent {
  @Input() storedCategories: Array<Category> = [];
}
