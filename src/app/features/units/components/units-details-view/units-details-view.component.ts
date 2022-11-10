import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CostModel, UnitModel } from '../../models/units.models';

@Component({
  selector: 'app-units-details-view',
  templateUrl: './units-details-view.component.html',
  styleUrls: ['./units-details-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsDetailsViewComponent {
  @Input() selectedUnit: UnitModel | undefined | null = null;

  readonly displayedFields: { key: keyof UnitModel | keyof CostModel; header: string }[] = [
    {
      key: 'id',
      header: 'ID',
    },
    { key: 'name', header: 'Name' },
    { key: 'description', header: 'Description' },
    { key: 'age', header: 'Min. Required Age' },
    { key: 'Wood', header: 'Wood Cost' },
    { key: 'Food', header: 'Food Cost' },
    { key: 'Gold', header: 'Gold Cost' },
    { key: 'build_time', header: 'Build Time' },
    { key: 'reload_time', header: 'Reload Time' },
    { key: 'hit_points', header: 'Description' },
    { key: 'attack', header: 'Attack' },
    { key: 'accuracy', header: 'Accuracy' },
  ];

  getData(key: keyof UnitModel | keyof CostModel): string {
    if (!this.selectedUnit) return '-';
    if (key === 'Food' || key === 'Gold' || key === 'Wood')
      return this.selectedUnit.cost && this.selectedUnit.cost[key] ? this.selectedUnit.cost[key] + '' : '-';
    return this.selectedUnit[key] ? this.selectedUnit[key] + '' : '-';
  }
}
