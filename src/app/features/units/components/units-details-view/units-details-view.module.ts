import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { UnitsDetailsViewComponent } from './units-details-view.component';

@NgModule({
  declarations: [UnitsDetailsViewComponent],
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  exports: [UnitsDetailsViewComponent]
})
export class UnitsDetailsViewModule { }
