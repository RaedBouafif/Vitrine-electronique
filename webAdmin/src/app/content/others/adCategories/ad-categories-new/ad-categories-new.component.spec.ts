import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCategoriesNewComponent } from './ad-categories-new.component';

describe('AdCategoriesNewComponent', () => {
  let component: AdCategoriesNewComponent;
  let fixture: ComponentFixture<AdCategoriesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdCategoriesNewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCategoriesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
