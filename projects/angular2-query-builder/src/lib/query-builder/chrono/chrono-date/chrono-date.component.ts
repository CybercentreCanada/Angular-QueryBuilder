import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input, forwardRef } from '@angular/core';
import * as chrono from 'chrono-node';

@Component({
  selector: 'chrono-date',
  template: ` 
  <div class="outer-wrapper">
    <div class="input-wrapper">
      <input class="textbox" #txt="ngModel" type="text" [(ngModel)]="text" (change)="textUpdate($event)" placeholder="yyyy-mm-dd">
      <span class="icon-wrapper">
        <span class="calendar">
          <input #cal="ngModel" type="date" [(ngModel)]="date" (change)="calendarUpdate($event)">
          <i class="material-icons">calendar_today</i>
        </span>
      </span>
    </div>
    <span class="chrono-alert" *ngIf="!textValid && txt.touched">Unable to parse date</span>
  </div>
  `,
  styles: [`
  .calendar {
    display: inline-block;
    position: relative;
    line-height: 0;
  }

  .calendar input[type="date"] {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    border: 0;
    overflow: hidden;
    cursor: pointer;
    clip-path: inset(0 17px 0 0);
    width: 40px;
  }

  .calendar input[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute;
    top: -150%;
    left: -150%;
    width: 300%;
    height: 300%;
    cursor: pointer;
  }
  
  .calendar input[type="date"]:hover + button {
    background-color: silver;
  }

  .calendar .material-icons {
    line-height: 21px;
  }
  
  .icon-wrapper {
    display:inline-flex;
    position: absolute;
    right: 5px;
  }

  .textbox {
    padding: 5px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .input-wrapper {
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    position: relative;
  }

  .outer-wrapper {
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    position: relative;
  }
  
  
  .chrono-alert {
    color: red;
    margin: 0 10px;
  }

  :host.q-input-control {
    border: none !important;
    padding: 0 !important;
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
    // let parsed = chrono.parse(this.text);
    // if (parsed.length > 0) {
    //   this.textValid = true;
    //   let date = parsed[0].date().toISOString().slice(0,10);
    //   this.date = date;
    //   this.onChange(this.date);
    // } else {
    //   this.textValid = false;
    //   this.date = '';
    //   this.onChange(this.date);
    // }
    let parsed = chrono.parse(this.text);
    if (parsed.length > 0) {
      this.textValid = true;
      let date = parsed[0].date().toISOString().slice(0,10);
      this.date = date;
      this.text = this.date;
      this.onChange(this.date);
    } else {
      this.textValid = false;
      this.date = '';
      this.onChange(this.date);
    }
  };

  calendarUpdate($event) {
    console.log("hello");
    this.textValid = true;
    // this.text = '';
    this.text = this.date;
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
