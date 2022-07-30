import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/core';
import { Article } from 'src/app/core/_models/Article';
import { Review } from '../../_models/Review';
import { HttpClient } from '@angular/common/http';

const routes = {
  article: () => `/article`,
  update: () => `/updateQty`,
  activeArticles: () => `/getActiveArticles`,
  articleWithId: (id: string) => `/article/${id}`,
  articleByCategory: (id: string) => `/getByCategory/${id}`,
  articleBySubCategory: (id: string) => `/getBySubCategory/${id}`,
  articleInDiscount: () => `/getByDiscount`,
  review: () => `/review`,
  reviewWithId: (id: string) => `/review/${id}`,
  reviewByArticle: (id: string) => `/getByArticle/${id}`,
  
};
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  route = 'http://localhost:4001';
  constructor(private api: HttpClient) {}

  getAllArticles(): Observable<Article[]> {
    return this.api.get<Article[]>(this.route + routes.activeArticles());
  }
  getArticlesByCategory(id:string): Observable<Article[]> {
    return this.api.get<Article[]>(this.route + routes.articleByCategory(id));
  }
  getArticlesBySubCategory(id:string): Observable<Article[]> {
    return this.api.get<Article[]>(this.route + routes.articleBySubCategory(id));
  }
  getArticlesInDiscount(): Observable<Article[]> {
    return this.api.get<Article[]>(this.route + routes.articleInDiscount());
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
  updateArticlesQty(array: any): Observable<boolean> {
    return this.api.put<boolean>(
      this.route + routes.update(),
      {data:array}    );
  }
  deleteArticle(id: string): Observable<Article> {
    return this.api.delete<Article>(
      this.route + routes.articleWithId(id)    );
  }


  /* Review */

  getReviews(): Observable<Review[]> {
    return this.api.get<Review[]>(this.route + routes.review());
  }
  getArticleReviews(id:string): Observable<Review[]> {
    return this.api.get<Review[]>(this.route + routes.reviewByArticle(id));
  }
  getReview(id: string): Observable<Review> {
    return this.api.get<Review>(
      this.route + routes.reviewWithId(id)
    );
  }
  addReview(article: Review): Observable<Review> {
    return this.api.post<Review>(
      this.route + routes.review(),
      article    );
  }
  updateReview(article: Review): Observable<Review> {
    return this.api.put<Review>(
      this.route + routes.reviewWithId(article._id),
      article
    );
  }
}
