import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnitsDetailsViewModule } from '../../components/units-details-view/units-details-view.module';
import { UnitsDetailPageComponent } from './units-detail-page.component';

@NgModule({
  declarations: [UnitsDetailPageComponent],
  imports: [UnitsDetailsViewModule, RouterModule.forChild([
    { path: '', component: UnitsDetailPageComponent },
  ])],
  exports: [UnitsDetailPageComponent]
})
export class UnitsDetailsPageModule { }
