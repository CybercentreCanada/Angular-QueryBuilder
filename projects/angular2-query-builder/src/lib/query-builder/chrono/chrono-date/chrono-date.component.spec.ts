import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronoDateComponent } from './chrono-date.component';

describe('ChronoDateComponent', () => {
  let component: ChronoDateComponent;
  let fixture: ComponentFixture<ChronoDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChronoDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronoDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
