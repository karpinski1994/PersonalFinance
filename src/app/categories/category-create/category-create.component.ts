import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit, OnDestroy {
  enteredTitle = '';
  enteredPercent = 0;
  availablePercent: number;
  private percentSub: Subscription;

  constructor(public catServ: CategoriesService) {}

  ngOnInit() {
    this.percentSub = this.catServ
      .getPercentUpdateListener()
      .subscribe(percent => {
        this.availablePercent = percent;
      });
  }

  onAddCategory(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.catServ.addCategory(
      form.value.enteredTitle,
      form.value.enteredPercent
    );
    form.resetForm();
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

  ngOnDestroy() {
    this.percentSub.unsubscribe();
  }
}
