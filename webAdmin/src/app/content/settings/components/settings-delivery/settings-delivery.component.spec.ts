import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDeliveryComponent } from './settings-delivery.component';

describe('SettingsDeliveryComponent', () => {
  let component: SettingsDeliveryComponent;
  let fixture: ComponentFixture<SettingsDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsDeliveryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
