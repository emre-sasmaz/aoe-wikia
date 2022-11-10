import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UnitFilterModel } from '../models/units-form.models';
import { UnitModel } from '../models/units.models';
import { UnitPageActions } from './unit.actions';
import { selectSelectedUnit, UnitState } from './unit.reducers';
import * as UnitSelectors from './unit.selectors';

@Injectable({
  providedIn: 'root',
})
export class UnitFacade {
  vm$ = this.store.select(UnitSelectors.selectUnitPageVievModel);
  selectedUnit$: Observable<UnitModel | undefined> = this.store.select(selectSelectedUnit);

  constructor(private readonly store: Store<UnitState>) { }

  loadUnitsData(): void {
    this.store.dispatch(UnitPageActions.getData());
  }

  selectUnit(unit: UnitModel): void {
    this.store.dispatch(UnitPageActions.selectData(unit));
  }

  updateFormState(formState: UnitFilterModel): void {
    this.store.dispatch(UnitPageActions.formChanged(formState));
  }
}
