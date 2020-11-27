import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input, forwardRef } from '@angular/core';
import * as chrono from 'chrono-node';

@Component({
  selector: 'chrono-date',
  template: `
  <input #txt="ngModel" type="text" [(ngModel)]="text" (change)="textUpdate($event)">
  <input #cal="ngModel" type="date" [(ngModel)]="date" (change)="calendarUpdate($event)">
  <span class="chrono-alert" *ngIf="!textValid && txt.touched">Unable to parse date</span>
  `,
  styles: [`
  .chrono-alert {
    color: red;
    padding: 0 10px;
  }

  :host.q-input-control {
    padding: 2px 2px !important;
  }
  `],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ChronoDateComponent),
    multi: true
  }]
})
export class ChronoDateComponent implements OnInit, ControlValueAccessor {

  @Input() date: string;
  public text;
  public textValid;

  onChange = (_ => {});
  onBlur = (_ => {});

  constructor() { }

  ngOnInit(): void {
  }

  textUpdate($event) {
    let parsed = chrono.parse(this.text);
    if (parsed.length > 0) {
      this.textValid = true;
      let date = parsed[0].date().toISOString().slice(0,10);
      this.date = date;
      this.onChange(this.date);
    } else {
      this.textValid = false;
      this.date = '';
      this.onChange(this.date);
    }
  };

  calendarUpdate($event) {
    this.textValid = true;
    this.text = '';
    this.onChange(this.date);
  }

  writeValue(obj: string): void {
    this.date = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }

}
