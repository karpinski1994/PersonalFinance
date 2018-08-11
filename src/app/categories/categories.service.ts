import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category } from './category.model';
import { Router } from '@angular/router';

// Making only one instance of this service for the whole app
@Injectable({providedIn: 'root'})
export class CategoriesService {
  private categories: Array<Category> = [];
  private categoriesUpdated = new Subject<Array<Category>>();
  private availablePercent = 100;
  private percentUpdated = new Subject<number>();

  constructor(private http: HttpClient, private router: Router) {}

  getCategories() {
    this.http.get<{message: string, categories: any}>(
      'http://localhost:3000/api/categories'
    )
    .pipe(map((categoryData) => {
      return categoryData.categories.map(category => {
        return {
          id: category._id,
          title: category.title,
          budgetPercent: category.budgetPercent,
          outcomesList: category.outcomesList
        };
      });
    }))
    .subscribe((transformedCategories) => {
      this.categories = transformedCategories;
      this.categoriesUpdated.next([...this.categories]);
      this.countAvailablePercent();
      this.percentUpdated.next(this.availablePercent);
    });
  }

  getCategory(id: string) {
    return {...this.categories.find( category => category.id === id )};
  }



  getCategoryUpdateListener() {
    return this.categoriesUpdated.asObservable();
  }

  addCategory(title: string, percent: number) {
    const category: Category = { id: null, title: title, budgetPercent: percent, outcomesList: []};
    this.http.post<{ message: string, categoryId: string }>('http://localhost:3000/api/categories', category)
    .subscribe((responseData) => {
      const id = responseData.categoryId;
      category.id = id;
      this.categories.push(category);
      this.categoriesUpdated.next([...this.categories]);
      this.countAvailablePercent();
      this.percentUpdated.next(this.availablePercent);
      this.router.navigate(['/']);
    });

  }

  updateCategory(id: string, title: string, percent: number) {
    const category: Category = { id: id, title: title, budgetPercent: percent, outcomesList: [] };
    this.http.put('http://localhost:3000/api/categories/' + id, category)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/']);
      });
  }

  deleteCategory(categoryId: string) {
    this.http
      .delete('http://localhost:3000/api/categories/' + categoryId)
      .subscribe(() => {
        const updatedCategories = this.categories.filter(category => {
          return category.id !== categoryId;
        });
        this.categories = updatedCategories;
        this.categoriesUpdated.next([...this.categories]);
        this.countAvailablePercent();
        this.percentUpdated.next(this.availablePercent);
      });
  }

  countAvailablePercent() {
    if (this.categories.length > 0 ) {
      const categories = [...this.categories];
      const categoriesTotalPercent = Number(categories
        .map(category => category.budgetPercent)
        .reduce((a, b) => +a + +b));
      this.availablePercent = 100 - categoriesTotalPercent;
    } else {
      this.availablePercent = 100;
    }
  }

  getPercentUpdateListener() {
    return this.percentUpdated.asObservable();
  }
}
