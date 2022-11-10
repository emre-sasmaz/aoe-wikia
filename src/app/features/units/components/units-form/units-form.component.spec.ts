import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElement } from 'src/app/helpers/utils.spec-helper';

import { CostModel } from '../../models/units.models';
import { UnitsFormComponent } from './units-form.component';
import { UnitsFormModule } from './units-form.module';

describe('UnitsFormComponent', () => {
  let component: UnitsFormComponent;
  let fixture: ComponentFixture<UnitsFormComponent>;
  let viewElement: HTMLElement;
  let content: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsFormModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitsFormComponent);
    component = fixture.componentInstance;
    viewElement = fixture.nativeElement;
    content = getElement(viewElement, 'form')[0]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render min max info properly', () => {
    const keys: (keyof CostModel)[] = ['Food', 'Gold', 'Wood']
    keys.forEach(key => {
      let checkboxElement = getElement(content, `div[ng-reflect-name='${key}'] mat-checkbox input`)[0]
      let minMaxElement = getElement(content, `div[ng-reflect-name='${key}'] strong`)[0]
      checkboxElement.click();
      fixture.detectChanges();
      expect(minMaxElement.textContent).toBe(`Min: 0 - Max: ${component.MAX_COST_VALUE}`)
    })
  })
});
