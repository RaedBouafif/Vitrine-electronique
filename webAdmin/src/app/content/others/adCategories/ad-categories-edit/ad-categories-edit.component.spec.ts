import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCategoriesEditComponent } from './ad-categories-edit.component';

describe('AdCategoriesEditComponent', () => {
  let component: AdCategoriesEditComponent;
  let fixture: ComponentFixture<AdCategoriesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdCategoriesEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCategoriesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
