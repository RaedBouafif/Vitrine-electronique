import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNavbarItemComponent } from './header-navbar-item.component';

describe('HeaderNavbarItemComponent', () => {
  let component: HeaderNavbarItemComponent;
  let fixture: ComponentFixture<HeaderNavbarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderNavbarItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNavbarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
