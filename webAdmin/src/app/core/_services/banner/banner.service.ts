import { Injectable } from '@angular/core';
import { ApiService } from '@app/core';
import { Observable } from 'rxjs';
import { Ad } from '@app/core/_models/Ad';
import { Banner } from '@app/core/_models/Banner';
import { HttpClient } from '@angular/common/http';

const routes = {
  ad: () => `/ad`,
  adWithId: (id: string) => `/ad/${id}`,
  banner: () => `/banner`,
  bannerWithId: (id: string) => `/banner/${id}`
};
@Injectable({
  providedIn: 'root'
})
export class BannerService {
  route = 'http://localhost:4006';
  constructor(private _http:HttpClient) {}

  getAllAds(): Observable<Ad[]> {
    return this._http.get<Ad[]>(this.route + routes.ad());
  }
  getAd(id: string): Observable<Ad> {
    return this._http.get<Ad>(this.route + routes.adWithId(id));
  }
  addAd(ad: Ad): Observable<Ad> {
    return this._http.post<Ad>(this.route + routes.ad(), ad);
  }
  updateAd(ad: Ad): Observable<Ad> {
    return this._http.put<Ad>(this.route + routes.adWithId(ad._id), ad);
  }
  deleteAd(id: string): Observable<Ad> {
    return this._http.delete<Ad>(this.route + routes.adWithId(id));
  }
  getAllBanners(): Observable<Banner[]> {
    return this._http.get<Banner[]>(this.route + routes.banner());
  }
  getBanner(id: string): Observable<Banner> {
    return this._http.get<Banner>(this.route + routes.bannerWithId(id));
  }
  addBanner(banner: Banner): Observable<Banner> {
    return this._http.post<Banner>(this.route + routes.banner(), banner);
  }
  updateBanner(banner: Banner): Observable<Banner> {
    return this._http.put<Banner>(
      this.route + routes.bannerWithId(banner._id),
      banner
    );
  }
  deleteBanner(id: string): Observable<Banner> {
    return this._http.delete<Banner>(
      this.route + routes.bannerWithId(id)    );
  }
}
