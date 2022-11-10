import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { mockedData } from 'src/app/configs/test.configs';

import { UnitFilterModel } from '../models/units-form.models';
import { AGES } from '../models/units.models';
import { UnitPageActions } from './unit.actions';
import { UnitFacade } from './unit.facade';
import { UnitState } from './unit.reducers';

describe('Unit Facade', () => {
  let facade: UnitFacade;
  let store: MockStore<UnitState>;

  const initialState = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnitFacade,
        provideMockStore({ initialState }),
      ],
    });

    facade = TestBed.inject(UnitFacade);
    store = TestBed.inject(MockStore);

    spyOn(store, 'dispatch');
  });

  it('should dispatch load data', () => {
    facade.loadUnitsData();
    expect(store.dispatch).toHaveBeenCalledWith(UnitPageActions.getData())
  })

  it('should dispatch select unit', () => {
    facade.selectUnit(mockedData[0])
    expect(store.dispatch).toHaveBeenCalledWith(UnitPageActions.selectData(mockedData[0]))
  })

  it('should dispatch update form state', () => {
    const mockFilter: UnitFilterModel = {
      age: AGES.DARK,
      cost: {
        Gold: 32,
        Wood: 96
      }
    }
    facade.updateFormState(mockFilter);
    expect(store.dispatch).toHaveBeenCalledWith(UnitPageActions.formChanged(mockFilter))
  })

});
