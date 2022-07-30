import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeColorPickerComponent } from './theme-color-picker.component';

describe('ThemeColorPickerComponent', () => {
  let component: ThemeColorPickerComponent;
  let fixture: ComponentFixture<ThemeColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeColorPickerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
