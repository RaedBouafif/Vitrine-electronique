import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesNewComponent } from './articles-new.component';

describe('ArticlesNewComponent', () => {
  let component: ArticlesNewComponent;
  let fixture: ComponentFixture<ArticlesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlesNewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
