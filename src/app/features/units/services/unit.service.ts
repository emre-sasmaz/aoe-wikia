import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UnitResponseModel } from '../models/units.models';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(private readonly http: HttpClient) { }

  getUnitData(): Observable<UnitResponseModel> {
    const url = 'assets/data/age-of-empires-units.json';
    return this.http.get<UnitResponseModel>(url);
  }
}
