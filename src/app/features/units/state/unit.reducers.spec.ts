import { mockedData } from 'src/app/configs/test.configs';

import { UnitFilterModel } from '../models/units-form.models';
import { AGES, UnitResponseModel } from '../models/units.models';
import { UnitPageActions } from './unit.actions';
import { initialState, unitsFeature } from './unit.reducers';

describe('Unit Reducer', () => {
  it('should return initial state', () => {
    const action = {} as any;
    const state = unitsFeature.reducer(undefined, action);
    expect(state).toEqual(initialState);
  })

  it('should update selected data', () => {
    const action = UnitPageActions.selectData(mockedData[0]);
    const state = unitsFeature.reducer(undefined, action);
    expect(state.selectedUnit?.age).toBe(mockedData[0].age)
    expect(state.selectedUnit?.accuracy).toBe(mockedData[0].accuracy)
  })

  it('should update form state', () => {
    const mockFilter: UnitFilterModel = { age: AGES.ALL, cost: { Food: 20, Wood: 2323 } }
    const action = UnitPageActions.formChanged(mockFilter);
    const state = unitsFeature.reducer(undefined, action)
    expect(state.filter?.age).toBe(AGES.ALL)
    expect(state.filter?.cost?.Food).toBe(20)
    expect(state.filter?.cost?.Wood).toBe(2323)
  })

  it('should update loading state when getData', () => {
    const action = UnitPageActions.getData();
    const state = unitsFeature.reducer(undefined, action);
    expect(state.loading).toBeTrue();
    expect(state.loaded).toBeFalse()
  })


  it('should reset collection and update loading states when failed', () => {
    const action = UnitPageActions.getDataFailed();
    const state = unitsFeature.reducer(undefined, action);
    expect(state.collection).toEqual([]);
    expect(state.loaded).toBeTrue();
    expect(state.loading).toBeFalse()
  })

  it('should update collection on success', () => {
    const mockResponse: UnitResponseModel = {
      units: mockedData
    }
    const action = UnitPageActions.getDataSuccess(mockResponse)
    const state = unitsFeature.reducer(undefined, action)
    expect(state.loading).toBeFalse();
    expect(state.loaded).toBeTrue();
    expect(state.collection).toEqual(mockedData)
  })


  it('should update collection on success with undefined', () => {
    const mockResponse: UnitResponseModel = {
      units: undefined
    }
    const action = UnitPageActions.getDataSuccess(mockResponse)
    const state = unitsFeature.reducer(undefined, action)
    expect(state.loading).toBeFalse();
    expect(state.loaded).toBeTrue();
    expect(state.collection).toEqual([])
  })
});
