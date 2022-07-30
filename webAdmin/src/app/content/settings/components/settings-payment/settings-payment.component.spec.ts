import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPaymentComponent } from './settings-payment.component';

describe('SettingsPaymentComponent', () => {
  let component: SettingsPaymentComponent;
  let fixture: ComponentFixture<SettingsPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPaymentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
