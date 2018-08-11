import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  GestureConfig,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSliderModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatIconModule,
  MatExpansionModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CategoryCreateComponent,
    CategoriesListComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSliderModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatIconModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
