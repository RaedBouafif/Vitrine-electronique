import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelInfoComponent } from './label-info.component';

describe('LabelInfoComponent', () => {
  let component: LabelInfoComponent;
  let fixture: ComponentFixture<LabelInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabelInfoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
