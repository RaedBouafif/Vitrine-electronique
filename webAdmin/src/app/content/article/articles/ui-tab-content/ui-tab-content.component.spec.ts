import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTabContentComponent } from './ui-tab-content.component';

describe('UiTabContentComponent', () => {
  let component: UiTabContentComponent;
  let fixture: ComponentFixture<UiTabContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiTabContentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
