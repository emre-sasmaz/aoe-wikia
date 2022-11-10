import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';

import { UnitsFormComponent } from './units-form.component';

@NgModule({
  declarations: [UnitsFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonToggleModule, MatCheckboxModule, MatSliderModule],
  exports: [UnitsFormComponent]
})
export class UnitsFormModule { }
