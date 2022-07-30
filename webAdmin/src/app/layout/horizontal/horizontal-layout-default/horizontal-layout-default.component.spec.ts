import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalLayoutDefaultComponent } from './horizontal-layout-default.component';

describe('HorizontalLayoutDefaultComponent', () => {
  let component: HorizontalLayoutDefaultComponent;
  let fixture: ComponentFixture<HorizontalLayoutDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HorizontalLayoutDefaultComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalLayoutDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
