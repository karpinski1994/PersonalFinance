import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Category } from '../category.model';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit, OnDestroy {

  categories: Array<Category> = [];
  private categoriesSub: Subscription;

  constructor( public  catServ: CategoriesService ) {}

  ngOnInit() {
    this.catServ.getCategories();
    this.categoriesSub = this.catServ.getCategoryUpdateListener()
    .subscribe((categories: Array<Category>) => {
      this.categories = categories;
    });
  }

  onDelete(categoryId: string) {
    this.catServ.deleteCategory(categoryId);
  }

  ngOnDestroy() {
    // this.categoriesSub.unsubscribe();
  }
}
