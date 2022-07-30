import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent, Observable, empty } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WindowScrollService {
  _onScroll: Observable<number>;

  constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this._onScroll = fromEvent(window, 'scroll').pipe(
        map(event => {
          return window.scrollY || this.document.documentElement.scrollTop;
        }),
        share()
      );
    } else {
      this._onScroll = empty();
    }
  }

  public onWindowScroll(): Observable<number> {
    return this._onScroll;
  }
}
