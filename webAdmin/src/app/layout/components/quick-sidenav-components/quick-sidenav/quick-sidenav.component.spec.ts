import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSidenavComponent } from './quick-sidenav.component';

describe('QuickSidenavComponent', () => {
  let component: QuickSidenavComponent;
  let fixture: ComponentFixture<QuickSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuickSidenavComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
