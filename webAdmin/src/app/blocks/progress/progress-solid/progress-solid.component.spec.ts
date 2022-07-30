import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressSolidComponent } from './progress-solid.component';

describe('ProgressSolidComponent', () => {
  let component: ProgressSolidComponent;
  let fixture: ComponentFixture<ProgressSolidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressSolidComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressSolidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
