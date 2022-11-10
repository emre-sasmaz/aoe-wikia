import { UnitFilterModel } from './units-form.models';
import { UnitModel } from './units.models';

export type UnitDetailViewType = { key: Pick<UnitModel, 'id' | 'name' | 'description' | 'age' | 'cost'>; header: string };

export interface UnitPageViewModel {
  dataSource: UnitModel[];
  filter: UnitFilterModel;
}
