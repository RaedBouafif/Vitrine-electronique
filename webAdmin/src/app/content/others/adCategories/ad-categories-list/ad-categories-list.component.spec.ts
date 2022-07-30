import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCategoriesListComponent } from './ad-categories-list.component';

describe('AdCategoriesListComponent', () => {
  let component: AdCategoriesListComponent;
  let fixture: ComponentFixture<AdCategoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdCategoriesListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
