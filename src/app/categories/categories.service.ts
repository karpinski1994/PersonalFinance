import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Category } from './category.model';

// Making only one instance of this service for the whole app
@Injectable({providedIn: 'root'})
export class CategoriesService {
  private categories: Array<Category> = [];
  private categoriesUpdated = new Subject<Array<Category>>();
  private availablePercent = 100;
  private percentUpdated = new Subject<number>();

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
    this.countAvailablePercent();
    this.percentUpdated.next(this.availablePercent);
  }

  countAvailablePercent() {
    if (this.categories.length > 0 ) {
      const categories = [...this.categories];
      const categoriesTotalPercent = Number(categories
        .map(category => category.budgetPercent)
        .reduce((a, b) => +a + +b));
      this.availablePercent = 100 - categoriesTotalPercent;
    }
  }

  getPercentUpdateListener() {
    return this.percentUpdated.asObservable();
  }
}
