import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerNewComponent } from './banner-new.component';

describe('BannerNewComponent', () => {
  let component: BannerNewComponent;
  let fixture: ComponentFixture<BannerNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BannerNewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
