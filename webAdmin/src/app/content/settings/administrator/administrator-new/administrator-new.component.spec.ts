import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorNewComponent } from './administrator-new.component';

describe('AdministratorNewComponent', () => {
  let component: AdministratorNewComponent;
  let fixture: ComponentFixture<AdministratorNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorNewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
