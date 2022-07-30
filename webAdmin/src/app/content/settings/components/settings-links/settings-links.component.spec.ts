import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLinksComponent } from './settings-links.component';

describe('SettingsLinksComponent', () => {
  let component: SettingsLinksComponent;
  let fixture: ComponentFixture<SettingsLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsLinksComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
