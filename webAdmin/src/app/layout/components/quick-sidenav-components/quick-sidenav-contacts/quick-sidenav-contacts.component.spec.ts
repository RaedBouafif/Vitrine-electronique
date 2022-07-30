import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSidenavContactsComponent } from './quick-sidenav-contacts.component';

describe('QuickSidenavContactsComponent', () => {
  let component: QuickSidenavContactsComponent;
  let fixture: ComponentFixture<QuickSidenavContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuickSidenavContactsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSidenavContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
