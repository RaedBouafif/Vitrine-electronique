import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxSidebarComponent } from './inbox-sidebar.component';

describe('InboxSidebarComponent', () => {
  let component: InboxSidebarComponent;
  let fixture: ComponentFixture<InboxSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InboxSidebarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
