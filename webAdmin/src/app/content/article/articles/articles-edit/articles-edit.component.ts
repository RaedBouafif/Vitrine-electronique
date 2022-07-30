import { Component, OnInit, ViewChild } from '@angular/core';
import {
  faCheck,
  faChevronLeft,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { UiTabContentComponent } from '../ui-tab-content/ui-tab-content.component';
import { RedirectService } from '@app/core/services/redirect.service';
import { ArticleService } from '@app/core/_services/article/article.service';
import { ActivatedRoute } from '@angular/router';
import { Article, PriceHistory } from '@app/core/_models/Article';

@Component({
  selector: 'prx-articles-edit',
  templateUrl: './articles-edit.component.html',
  styleUrls: ['./articles-edit.component.scss']
})
export class ArticlesEditComponent implements OnInit {
  @ViewChild(UiTabContentComponent, { static: false })
  child: UiTabContentComponent;
  icons = {
    check: faCheck,
    chevronLeft: faChevronLeft,
    calendar: faCalendarAlt
  };
  articleId = '';
  article = new Article();
  oldPrice: Number;
  selectedSubCategory: any[] = [];
  newMedia: any[] = [];
  constructor(
    private _redirect: RedirectService,
    private articleService: ArticleService,
    private _router: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._router.params.subscribe(params => this.fetchUser(params['id']));
  }
  private fetchUser(id: string) {
    this.articleId = id;
    this.articleService.getArticle(id).subscribe((artilce: Article) => {
      this.article = artilce;
      this.article.tax = artilce.tax * 100;
      this.oldPrice = this.article.price;
      this.article.categories.forEach(item => {
        this.selectedSubCategory.push(item.subCategory);
        this.selectedSubCategory = [...this.selectedSubCategory];
      });
    });
  }
  submit(form: any) {
    this.newMedia.forEach(item => {
      if (item.type) {
        this.article.images.push(item.media);
      } else {
        this.article.videos.push(item.media);
      }
    });
    if (this.oldPrice !== this.article.price) {
      let history = new PriceHistory(this.article.price);
      this.article.priceHistory.push(history);
    }

    this.child.submit(form);
  }
  cancel() {
    this._redirect.toArticle();
  }
}
