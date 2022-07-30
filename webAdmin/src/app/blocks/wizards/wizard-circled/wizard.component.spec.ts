import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardCircledComponent } from './wizard-circled.component';

describe('WizardCircledComponent', () => {
  let component: WizardCircledComponent;
  let fixture: ComponentFixture<WizardCircledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WizardCircledComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardCircledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
