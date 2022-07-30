import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLanguageSelectorComponent } from './button-language-selector.component';

describe('ButtonLanguageSelectorComponent', () => {
  let component: ButtonLanguageSelectorComponent;
  let fixture: ComponentFixture<ButtonLanguageSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonLanguageSelectorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonLanguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
