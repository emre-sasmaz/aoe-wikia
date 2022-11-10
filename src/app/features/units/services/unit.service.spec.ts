import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockedData } from 'src/app/configs/test.configs';

import { UnitResponseModel } from '../models/units.models';
import { UnitService } from './unit.service';

const url = 'assets/data/age-of-empires-units.json';
const fakeUrl = "fakeUrl";

describe('UnitService', () => {
  let service: UnitService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UnitService],
    });
    service = TestBed.inject(UnitService);
    controller = TestBed.inject(HttpTestingController);

  });

  afterEach(() => controller.verify())

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return units data', () => {
    const response: UnitResponseModel = { units: mockedData }
    service.getUnitData().subscribe((response) => expect(response).toEqual(response));
    const request = controller.expectOne(url);
    expect(request.request.method).toBe("GET");
    request.flush(response);
  });
});
