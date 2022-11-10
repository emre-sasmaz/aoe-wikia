import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableColumns } from 'src/app/core/models/table.models';

import { UnitModel } from '../../models/units.models';

@Component({
  selector: 'app-units-table',
  templateUrl: './units-table.component.html',
  styleUrls: ['./units-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsTableComponent implements OnInit {
  @Input() dataSource: UnitModel[] = [];
  @Output() selectionChange: EventEmitter<UnitModel> = new EventEmitter<UnitModel>();
  activeIndex = -1;

  readonly columns: TableColumns<UnitModel>[] = [
    { key: 'id', header: 'Id' },
    { key: 'name', header: 'Name' },
    { key: 'age', header: 'Age' },
    {
      key: 'cost',
      header: 'Cost',
    },
  ];

  readonly displayedColumns = this.columns.map((column) => column.key);

  constructor() { }

  getData(element: UnitModel, column: TableColumns<UnitModel>): string {
    if (column.key === 'cost') {
      return element?.cost
        ? Object.entries(element.cost).reduce(
          (a, [key, value], i, arr) => (a += `${key} : ${value}${i < arr.length - 1 ? ', ' : ''}`),
          ''
        )
        : '-'
    }
    return element[column.key] ? element[column.key] + '' : '-'
  }

  rowSelect(e: UnitModel): void {
    this.selectionChange.emit(e);
  }

  ngOnInit(): void { }

  enter(i: number): void {
    this.activeIndex = i;
  }

  leave(): void {
    this.activeIndex = -1;
  }
}
