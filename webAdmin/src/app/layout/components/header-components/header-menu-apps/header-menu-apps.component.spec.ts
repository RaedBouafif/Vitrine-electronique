import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuAppsComponent } from './header-menu-apps.component';

describe('HeaderMenuAppsComponent', () => {
  let component: HeaderMenuAppsComponent;
  let fixture: ComponentFixture<HeaderMenuAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderMenuAppsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
