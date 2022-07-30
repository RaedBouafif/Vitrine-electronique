import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUserAccountComponent } from './header-user-account.component';

describe('HeaderUserAccountComponent', () => {
  let component: HeaderUserAccountComponent;
  let fixture: ComponentFixture<HeaderUserAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderUserAccountComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
