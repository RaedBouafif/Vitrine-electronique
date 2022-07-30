import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuMessagesComponent } from './header-menu-messages.component';

describe('HeaderMenuMessagesComponent', () => {
  let component: HeaderMenuMessagesComponent;
  let fixture: ComponentFixture<HeaderMenuMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderMenuMessagesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
