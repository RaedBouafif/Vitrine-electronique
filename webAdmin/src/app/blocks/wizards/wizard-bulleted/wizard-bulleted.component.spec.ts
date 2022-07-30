import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardBulletedComponent } from './wizard-bulleted.component';

describe('WizardBulletedComponent', () => {
  let component: WizardBulletedComponent;
  let fixture: ComponentFixture<WizardBulletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WizardBulletedComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardBulletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
