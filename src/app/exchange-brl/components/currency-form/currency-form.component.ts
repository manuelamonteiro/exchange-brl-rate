import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-currency-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './currency-form.component.html',
})
export class CurrencyFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() loading = false;
  @Input() defaultValue = '';
  @Output() submitCode = new EventEmitter<string>();

  ctrl = new FormControl<string>('', { nonNullable: true, validators: [Validators.required] });
  private valueSub?: Subscription;

  ngOnInit() {
    this.ctrl.setValue(this.defaultValue || '');
    this.subscribeUppercase();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['defaultValue'] && !changes['defaultValue'].firstChange) {
      this.ctrl.setValue(this.defaultValue || '');
    }
  }

  onSubmit() {
    this.submitCode.emit(this.ctrl.value);
  }

  ngOnDestroy(): void {
    this.valueSub?.unsubscribe();
  }

  private subscribeUppercase() {
    this.valueSub = this.ctrl.valueChanges.subscribe((value) => {
      const upper = (value || '').toUpperCase();
      if (upper !== value) {
        this.ctrl.setValue(upper, { emitEvent: false });
      }
    });
  }
}
