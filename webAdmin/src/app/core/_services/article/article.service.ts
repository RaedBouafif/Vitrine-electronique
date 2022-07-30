import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '@app/core';
import { Article } from '@app/core/_models/Article';
import { HttpClient } from '@angular/common/http';

const routes = {
  article: () => `/article`,
  articleWithId: (id: string) => `/article/${id}`
};
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  route = 'http://localhost:4001';
  constructor(private api: HttpClient) {}

  getAllArticles(): Observable<Article[]> {
    return this.api.get<Article[]>(this.route + routes.article());
  }
  getArticle(id: string): Observable<Article> {
    return this.api.get<Article>(
      this.route + routes.articleWithId(id)
    );
  }
  addArticle(article: Article): Observable<Article> {
    return this.api.post<Article>(
      this.route + routes.article(),
      article
    );
  }
  updateArticle(article: Article): Observable<Article> {
    return this.api.put<Article>(
      this.route + routes.articleWithId(article._id),
      article    );
  }
  deleteArticle(id: string): Observable<Article> {
    return this.api.delete<Article>(
      this.route + routes.articleWithId(id)
    );
  }
}
