import { FormControl, FormGroup } from '@angular/forms';

import { AGES, CostModel } from './units.models';

export interface UnitFilterModel {
  age?: AGES;
  cost?: Partial<CostModel>;
}

export interface SliderControl {
  active: FormControl<boolean>;
  value: FormControl<number>;
}

export type CostControlName = keyof CostModel;

export type CostForm = Partial<Record<CostControlName, FormGroup<SliderControl>>>;
export type AgeForm = { age: FormControl<AGES> };

export type UnitForm = AgeForm & CostForm;
