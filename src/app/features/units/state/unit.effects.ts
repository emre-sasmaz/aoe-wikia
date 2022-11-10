import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { UnitService } from '../services/unit.service';
import { UnitPageActions } from './unit.actions';

@Injectable()
export class UnitEffects {
  constructor(private readonly actions$: Actions, private readonly service: UnitService) { }

  getUnits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnitPageActions.getData),
      switchMap((action) =>
        this.service.getUnitData().pipe(
          map((result) => UnitPageActions.getDataSuccess(result)),
          catchError((err) => of(UnitPageActions.getDataFailed()))
        )
      )
    )
  );
}
