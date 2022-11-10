import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { CostControlName, CostForm, UnitFilterModel, UnitForm } from '../../models/units-form.models';
import { AGES } from '../../models/units.models';

@Component({
  selector: 'app-units-form',
  templateUrl: './units-form.component.html',
  styleUrls: ['./units-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() filter: UnitFilterModel | null = null;
  @Output() filterChange: EventEmitter<UnitFilterModel | null> = new EventEmitter<UnitFilterModel | null>();

  onDestroy$: Subject<void> = new Subject<void>();

  readonly AGES = AGES;
  readonly ageFormControls: { value: string; label: String }[] = Object.entries(AGES).map(([key, value]) => {
    return { value: value, label: key };
  });

  readonly CONTROLS: CostControlName[] = ['Food', 'Gold', 'Wood'];
  readonly MAX_COST_VALUE: number = 200;

  form: FormGroup<UnitForm> = this.fb.nonNullable.group({
    age: [AGES.ALL],
    ...this.CONTROLS.reduce((costForm, currentKey) => {
      costForm[currentKey] = this.fb.nonNullable.group({
        active: [false],
        value: [{ value: 0, disabled: true }],
      });
      return costForm;
    }, {} as CostForm),
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe((changes) => {
      this.checkForm();
      this.filterChange.emit({
        age: changes.age,
        cost: {
          ...(changes.Food?.active ? { Food: changes.Food.value } : {}),
          ...(changes.Wood?.active ? { Wood: changes.Wood.value } : {}),
          ...(changes.Gold?.active ? { Gold: changes.Gold.value } : {}),
        },
      });
    });
  }

  private checkForm(): void {
    this.CONTROLS.forEach((control) => {
      this.form.get(control)?.get('active')?.value
        ? this.form.get(control)?.get('value')?.enable({ emitEvent: false })
        : this.form.get(control)?.get('value')?.disable({ emitEvent: false });
    });

    this.form.updateValueAndValidity({ emitEvent: false });
  }

  private updateForm(): void {
    if (!this.filter) this.form.reset();
    else {
      this.form.get('age')?.patchValue(this.filter.age ?? AGES.ALL, { emitEvent: false });
      this.CONTROLS.forEach(control => {
        if (this.filter?.cost && this.filter?.cost[control]) {
          this.form.get(control)?.get('active')?.patchValue(true, { emitEvent: false });
          this.form.get(control)?.get('value')?.patchValue(this.filter.cost[control], { emitEvent: false });
        }
      })
    }
    this.checkForm();
  }

  controlValue(control: CostControlName) {
    return this.form.get(control)?.get('active')?.value ? `Min: ${this.form.get(control)?.get('value')?.value ?? 0} - Max: ${this.MAX_COST_VALUE}` : '-'
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter']) {
      this.updateForm();
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
