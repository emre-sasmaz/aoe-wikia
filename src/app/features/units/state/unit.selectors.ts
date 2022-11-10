import { createSelector } from '@ngrx/store';

import { UnitFilterModel } from '../models/units-form.models';
import { AGES, UnitModel } from '../models/units.models';
import { unitsFeature } from './unit.reducers';

export const selectFilteredUnits = createSelector(
  unitsFeature.selectCollection,
  unitsFeature.selectFilter,
  (data: UnitModel[], query: UnitFilterModel | null) =>
    data?.filter((unit) => {
      let result = true;
      if (query?.age && query.age !== AGES.ALL) result &&= unit.age === query.age;
      if (query?.cost?.Food) result &&= !unit.cost?.Food ? false : unit.cost?.Food >= query.cost.Food
      if (query?.cost?.Gold) result &&= !unit.cost?.Gold ? false : unit.cost?.Gold >= query.cost.Gold;
      if (query?.cost?.Wood) result &&= !unit.cost?.Wood ? false : unit.cost?.Wood >= query.cost.Wood
      return result;
    })
);

export const selectUnitPageVievModel = createSelector(
  selectFilteredUnits,
  unitsFeature.selectFilter,
  (filteredData: UnitModel[], filter: UnitFilterModel | null) => ({ filteredData, filter })
);
