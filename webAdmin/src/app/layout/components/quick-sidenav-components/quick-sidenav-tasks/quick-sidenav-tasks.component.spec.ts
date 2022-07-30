import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSidenavTasksComponent } from './quick-sidenav-tasks.component';

describe('QuickSidenavTasksComponent', () => {
  let component: QuickSidenavTasksComponent;
  let fixture: ComponentFixture<QuickSidenavTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuickSidenavTasksComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSidenavTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
