import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { mockedData } from 'src/app/configs/test.configs';

import { UnitModel } from '../../models/units.models';
import { UnitFacade } from '../../state/unit.facade';
import { UnitsDetailPageComponent } from './units-detail-page.component';
import { UnitsDetailsPageModule } from './units-details-page.module';

describe('UnitsDetailPageComponent', () => {
  let component: UnitsDetailPageComponent;
  let fixture: ComponentFixture<UnitsDetailPageComponent>;

  const mockUnit$: BehaviorSubject<UnitModel | undefined> = new BehaviorSubject<UnitModel | undefined>(undefined);

  const fakeUnitFacade = {
    selectedUnit$: mockUnit$.asObservable(),
    selectUnit(unit: UnitModel | undefined): void {
      mockUnit$.next(unit);
    },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsDetailsPageModule, RouterTestingModule],
      providers: [{ provide: UnitFacade, useValue: fakeUnitFacade }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UnitsDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component['onDestroy$'], 'complete')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selected unit', fakeAsync(() => {
    fakeUnitFacade.selectUnit(mockedData[0]);
    tick();
    fixture.detectChanges()
    expect(component.selectedUnit).toEqual(mockedData[0]);
  }))

  it('should unsubscribe', () => {
    component.ngOnDestroy()
    expect(component['onDestroy$'].complete).toHaveBeenCalled();
  })
});
