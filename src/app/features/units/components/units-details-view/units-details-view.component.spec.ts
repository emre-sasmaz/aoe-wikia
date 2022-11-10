import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { mockedData } from 'src/app/configs/test.configs';
import { getElement } from 'src/app/helpers/utils.spec-helper';

import { UnitsDetailsViewComponent } from './units-details-view.component';
import { UnitsDetailsViewModule } from './units-details-view.module';

describe('UnitsDetailsViewComponent', () => {
  let component: UnitsDetailsViewComponent;
  let fixture: ComponentFixture<UnitsDetailsViewComponent>;
  let viewElement: HTMLElement;

  const getContent = (): HTMLElement => getElement(viewElement, 'mat-card-content')[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsDetailsViewModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitsDetailsViewComponent);
    component = fixture.componentInstance;
    viewElement = fixture.nativeElement
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should type error message when unit not found', () => {
    fixture.componentRef.setInput("selectedUnit", undefined)
    fixture.detectChanges();
    component.displayedFields.forEach(field => {
      expect(component.getData(field.key)).toBe("-")
    })
    const content = getContent();
    expect(content.textContent).toBe("Detail not found. Please return units page for selection.")
  })

  it('should render data properly', () => {
    mockedData.forEach(mock => {
      fixture.componentRef.setInput("selectedUnit", mock)
      fixture.detectChanges();
      let content = getContent();
      let fieldElements = getElement(content, ".field");
      expect(fieldElements.length).toBe(component.displayedFields.length);
      component.displayedFields.forEach((field, index) => {
        const fieldElement = fieldElements[index]
        const labelElement = getElement(fieldElement, '.key')
        const valueElement = getElement(fieldElement, '.value')
        expect(labelElement.length).toBe(1);
        expect(valueElement.length).toBe(1);
        expect(labelElement[0].textContent).toBe(field.header)
        expect(valueElement[0].textContent).toBe(component.getData(field.key))
      })
    })
  })

  it('should have back button for returning units page', () => {
    let button = getElement(viewElement, "mat-card-actions>button#backButton")
    expect(button.length).toBe(1)
  })
});
