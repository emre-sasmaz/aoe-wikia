import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { UnitFilterModel } from '../models/units-form.models';
import { UnitModel, UnitResponseModel } from '../models/units.models';

export const UnitPageActions = createActionGroup({
  source: 'Units Page',
  events: {
    'Get Data': emptyProps(),
    'Get Data Success': props<UnitResponseModel>(),
    'Get Data Failed': emptyProps(),
    'Select Data': props<UnitModel>(),
    'Form Changed': props<UnitFilterModel>(),
  },
});
