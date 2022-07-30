import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMetricsComponent } from './social-metrics.component';

describe('SocialMetricsComponent', () => {
  let component: SocialMetricsComponent;
  let fixture: ComponentFixture<SocialMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SocialMetricsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
