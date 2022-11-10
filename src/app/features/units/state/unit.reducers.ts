import { state } from '@angular/animations';
import { createFeature, createReducer, on } from '@ngrx/store';

import { UnitFilterModel } from '../models/units-form.models';
import { UnitModel } from '../models/units.models';
import { UnitPageActions } from './unit.actions';

const UNIT_PAGE_FEATURE_KEY = 'unitPage';

export interface UnitState {
  selectedUnit: UnitModel | undefined;
  filter: UnitFilterModel | null;
  collection: UnitModel[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: UnitState = {
  selectedUnit: undefined,
  filter: null,
  collection: [],
  loading: false,
  loaded: false,
};

export const unitsFeature = createFeature({
  name: UNIT_PAGE_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(UnitPageActions.getData, (state) => ({ ...state, loading: true, loaded: false })),
    on(UnitPageActions.getDataSuccess, (state, { units }) => ({ ...state, collection: units ?? [], loading: false, loaded: true })),
    on(UnitPageActions.getDataFailed, (state) => ({ ...state, collection: [], loading: false, loaded: true })),
    on(UnitPageActions.selectData, (state, element) => ({ ...state, selectedUnit: element })),
    on(UnitPageActions.formChanged, (state, formState) => ({ ...state, filter: formState }))
  ),
});

export const {
  name,
  reducer,
  selectFilter,
  selectCollection,
  selectLoaded,
  selectLoading,
  selectSelectedUnit,
  selectUnitPageState
} = unitsFeature;
