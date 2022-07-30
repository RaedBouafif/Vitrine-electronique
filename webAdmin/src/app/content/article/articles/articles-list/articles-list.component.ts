import { Component, OnInit, ViewChild } from '@angular/core';
import {
  faUserPlus,
  faFilter,
  faCircle,
  faTrash,
  faListUl,
  faTable,
  faUser,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import {
  ColumnMode,
  SelectionType,
  DatatableComponent
} from '@swimlane/ngx-datatable';
import { Article } from '@app/core/_models/Article';
import { ArticleService } from '@app/core/_services/article/article.service';
@Component({
  selector: 'prx-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false })
  table: DatatableComponent;
  filter = '';
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  icons = {
    add: faUserPlus,
    filter: faFilter,
    dot: faCircle,
    edit: faEdit,
    list: faListUl,
    table: faTable,
    details: faUser,
    delete: faTrash
  };
  isLoading = false;
  allArticles: Article[];
  articles: Article[];
  constructor(private articleService: ArticleService) {}

  get totalCount(): string {
    return this.articles ? `Total: ${this.articles.length}` : '';
  }

  ngOnInit(): void {
    this.getArticleList();
  }
  getPrice(artcile: Article) {
    let tax = artcile.tax ? artcile.tax : 0.18;
    return artcile.price + artcile.price * tax;
  }
  getPriceAfterDiscount(artcile: Article) {
    let percentage = artcile.discount.percentage / 100;
    return this.getPrice(artcile) - this.getPrice(artcile) * percentage;
  }
  getArticleList() {
    this.articleService.getAllArticles().subscribe(articles => {
      this.allArticles = articles;
      this.articles = articles;
      this.isLoading = false;
    });
  }
  delete(article: Article) {
    article.deleted = true;
    this.articleService.updateArticle(article).subscribe(data => {
      this.getArticleList();
    });
  }
  updateFilter() {
    // filter our data
    if (this.filter === '') {
      this.getArticleList();
    } else {
      const filtered = this.allArticles.filter((article: Article) => {
        return (
          article.reference.toLowerCase().indexOf(this.filter.toLowerCase()) !==
            -1 ||
          article.title.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
        );
      });

      // update the rows
      this.articles = filtered;

      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
  }
}
