import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Category } from './category.model';

// Making only one instance of this service for the whole app
@Injectable({providedIn: 'root'})
export class CategoriesService {
  private categories: Array<Category> = [];
  private categoriesUpdated = new Subject<Array<Category>>();

  getCategories() {
    return [...this.categories];
  }

  getCategoryUpdateListener() {
    return this.categoriesUpdated.asObservable();
  }

  addCategory(title: string, percent: number) {
    const category: Category = { title: title, budgetPercent: percent, outcomesList: []};
    this.categories.push(category);
    this.categoriesUpdated.next([...this.categories]);
  }
}
