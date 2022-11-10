import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UnitsFormModule } from '../../components/units-form/units-form.module';
import { UnitsTableModule } from '../../components/units-table/units-table.module';
import { UnitEffects } from '../../state/unit.effects';
import { unitsFeature } from '../../state/unit.reducers';
import { UnitsPageComponent } from './units-page.component';

@NgModule({
  declarations: [UnitsPageComponent],
  imports: [UnitsTableModule, UnitsFormModule, StoreModule.forFeature(unitsFeature), EffectsModule.forFeature([UnitEffects]),
    RouterModule.forChild([
      { path: '', component: UnitsPageComponent },
    ])],
  exports: [UnitsPageComponent]
})
export class UnitsPageModule { }
