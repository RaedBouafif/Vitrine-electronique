import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOverlayComponent } from './page-overlay.component';

describe('PageOverlayComponent', () => {
  let component: PageOverlayComponent;
  let fixture: ComponentFixture<PageOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageOverlayComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
