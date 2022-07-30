import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalLayoutDefaultComponent } from './vertical-layout-default.component';

describe('VerticalLayoutDefaultComponent', () => {
  let component: VerticalLayoutDefaultComponent;
  let fixture: ComponentFixture<VerticalLayoutDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerticalLayoutDefaultComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalLayoutDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
