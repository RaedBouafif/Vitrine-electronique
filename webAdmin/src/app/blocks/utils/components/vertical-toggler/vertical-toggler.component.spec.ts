import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalTogglerComponent } from './vertical-toggler.component';

describe('VerticalTogglerComponent', () => {
  let component: VerticalTogglerComponent;
  let fixture: ComponentFixture<VerticalTogglerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerticalTogglerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
