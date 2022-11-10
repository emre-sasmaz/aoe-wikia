import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

import { UnitModel } from '../../models/units.models';
import { UnitFacade } from '../../state/unit.facade';

@Component({
  selector: 'app-units-detail-page',
  templateUrl: './units-detail-page.component.html',
  styleUrls: ['./units-detail-page.component.scss'],
})
export class UnitsDetailPageComponent implements OnInit, OnDestroy {
  private readonly selectedUnit$: Observable<UnitModel | undefined> = this.facade.selectedUnit$;
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  selectedUnit: UnitModel | undefined;
  constructor(private readonly facade: UnitFacade) { }

  ngOnInit(): void {
    this.selectedUnit$.pipe(takeUntil(this.onDestroy$)).subscribe((selection) => (this.selectedUnit = selection));
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
