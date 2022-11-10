import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { mockedData } from 'src/app/configs/test.configs';

import { UnitsFormModule } from '../../components/units-form/units-form.module';
import { UnitsTableModule } from '../../components/units-table/units-table.module';
import { UnitFilterModel } from '../../models/units-form.models';
import { AGES, UnitModel } from '../../models/units.models';
import { UnitFacade } from '../../state/unit.facade';
import { UnitsPageComponent } from './units-page.component';

describe('UnitsPageComponent', () => {
  let component: UnitsPageComponent;
  let fixture: ComponentFixture<UnitsPageComponent>;
  let fakeUnitFacade: Pick<UnitFacade, keyof UnitFacade>;

  const fakeUnitFilter: UnitFilterModel = {
    age: AGES.ALL,
    cost: { Food: 10, Wood: 20 }
  }

  const fakeVM$: BehaviorSubject<{
    filteredData: UnitModel[];
    filter: UnitFilterModel | null;
  }> = new BehaviorSubject<{
    filteredData: UnitModel[];
    filter: UnitFilterModel | null;
  }>({ filter: null, filteredData: [] })

  const fakeUnitModel$: BehaviorSubject<UnitModel | undefined> = new BehaviorSubject<UnitModel | undefined>(undefined)

  beforeEach(async () => {
    fakeUnitFacade = {
      vm$: fakeVM$.asObservable(),
      selectedUnit$: fakeUnitModel$.asObservable(),
      selectUnit(unit): void {
        fakeUnitModel$.next(unit);
      },
      loadUnitsData(): void {
        fakeVM$.next({ ...fakeVM$.value, filteredData: mockedData })
      },
      updateFormState(formState) {
        fakeVM$.next({ ...fakeVM$.value, filter: formState })
      }
    }

    spyOn(fakeUnitFacade, 'selectUnit').and.callThrough();
    spyOn(fakeUnitFacade, 'loadUnitsData').and.callThrough();
    spyOn(fakeUnitFacade, 'updateFormState').and.callThrough();

    await TestBed.configureTestingModule({
      declarations: [UnitsPageComponent],
      imports: [UnitsFormModule, UnitsTableModule],
      providers: [{ provide: UnitFacade, useValue: fakeUnitFacade }],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call data loading in onInit', () => {
    component.ngOnInit();
    expect(fakeUnitFacade.loadUnitsData).toHaveBeenCalled();
  })

  it('should select unit when emitted from table', () => {
    component.selectUnit(mockedData[0])
    expect(fakeUnitFacade.selectUnit).toHaveBeenCalledWith(mockedData[0]);
  })

  it('should update form state when emitted from form', () => {
    component.filterChange(fakeUnitFilter)
    expect(fakeUnitFacade.updateFormState).toHaveBeenCalledWith(fakeUnitFilter);
    component.filterChange(null)
    expect(fakeUnitFacade.updateFormState).toHaveBeenCalledWith({});
  })
});
