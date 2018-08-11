import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';


const routes: Routes = [
  { path: '', component: CategoriesListComponent },
  { path: 'create', component: CategoryCreateComponent },
  { path: 'edit/:categoryId', component: CategoryCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
