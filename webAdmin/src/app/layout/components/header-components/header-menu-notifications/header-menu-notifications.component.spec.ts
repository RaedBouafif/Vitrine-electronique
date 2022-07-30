import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuNotificationsComponent } from './header-menu-notifications.component';

describe('HeaderMenuNotificationsComponent', () => {
  let component: HeaderMenuNotificationsComponent;
  let fixture: ComponentFixture<HeaderMenuNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderMenuNotificationsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
