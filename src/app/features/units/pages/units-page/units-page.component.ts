import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { UnitFilterModel } from '../../models/units-form.models';
import { UnitModel } from '../../models/units.models';
import { UnitFacade } from '../../state/unit.facade';

@Component({
  selector: 'app-units-page',
  templateUrl: './units-page.component.html',
  styleUrls: ['./units-page.component.scss'],
})
export class UnitsPageComponent implements OnInit {
  private readonly vm$ = this.facade.vm$;
  readonly onDestroy$: Subject<void> = new Subject<void>();

  dataSource: UnitModel[] = [];
  filter: UnitFilterModel | null = null;

  constructor(private readonly facade: UnitFacade) { }

  ngOnInit(): void {
    this.facade.loadUnitsData();
    this.vm$.pipe(takeUntil(this.onDestroy$)).subscribe((vm) => {
      this.dataSource = [...vm.filteredData]
      this.filter = vm.filter;
    });
  }

  selectUnit(unit: UnitModel) {
    this.facade.selectUnit(unit);
  }

  filterChange(filter: UnitFilterModel | null) {
    this.facade.updateFormState(filter ?? {});
  }
}
