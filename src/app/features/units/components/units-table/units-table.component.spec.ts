import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { mockedData } from 'src/app/configs/test.configs';
import { getTableHeaderCells, getTableHeaderRow, getTableRows } from 'src/app/helpers/utils.spec-helper';

import { UnitModel } from '../../models/units.models';
import { UnitsTableComponent } from './units-table.component';
import { UnitsTableModule } from './units-table.module';

describe('UnitsTableComponent', () => {
  let component: UnitsTableComponent;
  let fixture: ComponentFixture<UnitsTableComponent>;
  let tableElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsTableModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitsTableComponent);
    component = fixture.componentInstance;
    tableElement = fixture.nativeElement.querySelector('.cdk-table');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set dataSource properly', () => {
    fixture.componentRef.setInput("dataSource", [...mockedData])
    fixture.detectChanges();
    expect(component.dataSource).toEqual(mockedData);
  })


  it('should show data properly', () => {
    const mockData: UnitModel[] = [...mockedData]
    fixture.componentRef.setInput("dataSource", [...mockData.map(data => { return { ...data, cost: { ...data.cost, Food: 12, Wood: 33, Gold: 54 } } })])
    fixture.detectChanges();
    const rows = getTableRows(tableElement);
    expect(rows?.length).toBe(mockData.length);

    if (rows && rows?.length > 0) {
      component.dataSource.forEach((data, index) => {
        component.columns.forEach(column => {
          let value = component.getData(data, column);
          let expected = rows[index].getElementsByClassName(`mat-column-${column.key}`).item(0)?.textContent
          if (expected) expect(value).toBe(expected)
        })
      })
    }
  })

  it('should render "-" when data not found', () => {
    fixture.componentRef.setInput("dataSource", [{}])
    fixture.detectChanges();
    const rows = getTableRows(tableElement);
    component.columns.forEach(column => {
      expect(rows[0].getElementsByClassName(`mat-column-${column.key}`).item(0)?.textContent).toBe("-")
    })
  })

  it('should change activeIndex when hover on any row', () => {
    fixture.componentRef.setInput("dataSource", [...mockedData])
    fixture.detectChanges();

    const rows = getTableRows(tableElement);
    rows[0].dispatchEvent(new MouseEvent("mouseenter"))
    expect(component.activeIndex).toBe(0)
    rows[0].dispatchEvent(new MouseEvent("mouseleave"))
    expect(component.activeIndex).toBe(-1)
  })

  it('should render columns properly', () => {
    fixture.componentRef.setInput("dataSource", [...mockedData])
    fixture.detectChanges();
    const headers = getTableHeaderRow(tableElement);
    expect(headers.length).toBe(1);

    const headerCells = getTableHeaderCells(tableElement);
    expect(headerCells.length).toBe(component.columns.length);

    headerCells.forEach((cell, index) => {
      expect(cell.textContent).toBe(component.columns[index].header)
    })
  })

  it('should properly emit selectedUnit value with @Output', () => {
    fixture.componentRef.setInput("dataSource", [...mockedData])
    fixture.detectChanges();

    spyOn(component.selectionChange, 'emit');

    const rows = getTableRows(tableElement);
    rows[0].click();
    fixture.detectChanges();

    expect(component.selectionChange.emit).toHaveBeenCalledWith(component.dataSource[0]);
  })
});


export async function runOnPushChangeDetection(fixture: ComponentFixture<any>): Promise<void> {
  const changeDetectorRef = fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
  changeDetectorRef.detectChanges();
  return fixture.whenStable();
}
