import { mockedData } from 'src/app/configs/test.configs';

import { UnitFilterModel } from '../models/units-form.models';
import { AGES } from '../models/units.models';
import { selectCollection, selectFilter, selectSelectedUnit, UnitState } from './unit.reducers';
import { selectFilteredUnits, selectUnitPageVievModel } from './unit.selectors';

describe("Unit Selector", () => {
  let mockState: UnitState;
  let mockFilter: UnitFilterModel
  beforeEach(() => {
    mockState = {
      collection: mockedData,
      filter: null,
      loaded: true,
      loading: false,
      selectedUnit: mockedData[0]
    };
  })

  it("should select selectedUnit", () => {
    const result = selectSelectedUnit.projector(mockState);
    expect(result).toEqual(mockedData[0])
  })

  it("should select the collection", () => {
    const result = selectCollection.projector(mockState);
    expect(result?.length).toBe(mockedData.length)
    result?.forEach((el, i) => {
      expect(el).toBe(mockedData[i])
    })
  })

  it("should select with age filter", () => {
    Object.entries(AGES).forEach(([key, value]) => {
      mockFilter = {
        age: value
      }
      mockState = { ...mockState, filter: mockFilter }
      let collection = selectCollection.projector(mockState);
      let filter = selectFilter.projector(mockState)
      let result = selectFilteredUnits.projector(collection, filter);
      expect(result).toEqual(value === AGES.ALL ? mockedData : value === AGES.CASTLE ? [mockedData[1]] : value === AGES.IMPERIAL ? [mockedData[0], mockedData[2]] : [])
    })
  })

  it("should select with cost filters", () => {
    mockFilter = {
      cost: {
        Food: 40,
        Wood: 40,
        Gold: 170
      }
    }
    Object.entries(mockFilter.cost ?? {}).forEach(([key, value]) => {
      mockState = { ...mockState, filter: { cost: { [key]: value } } }
      let collection = selectCollection.projector(mockState);
      let filter = selectFilter.projector(mockState);
      let result = selectFilteredUnits.projector(collection, filter)
      expect(result).toEqual(key === 'Food' ? [mockedData[0]] : key === 'Wood' ? [mockedData[1]] : key === 'Gold' ? [mockedData[2]] : [])
    })
  })

  it("should select page view model", () => {
    const collection = selectCollection.projector(mockState);
    const filter = selectFilter.projector(mockState);
    const filteredUnits = selectFilteredUnits.projector(collection, filter)
    const result = selectUnitPageVievModel.projector(filteredUnits, filter);
    expect(result).toEqual({ filteredData: filteredUnits, filter: filter })
  })
});
