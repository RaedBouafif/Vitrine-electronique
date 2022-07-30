import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarInfoComponent } from './avatar-info.component';

describe('AvatarInfoComponent', () => {
  let component: AvatarInfoComponent;
  let fixture: ComponentFixture<AvatarInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarInfoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
