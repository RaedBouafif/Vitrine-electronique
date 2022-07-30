import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FadeContentComponent } from './fade-content.component';

describe('FadeContentComponent', () => {
  let component: FadeContentComponent;
  let fixture: ComponentFixture<FadeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FadeContentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FadeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
