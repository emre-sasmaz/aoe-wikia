import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { UnitsTableComponent } from './units-table.component';

@NgModule({
  declarations: [UnitsTableComponent],
  imports: [CommonModule, MatTableModule, RouterModule],
  exports: [UnitsTableComponent]
})
export class UnitsTableModule { }
