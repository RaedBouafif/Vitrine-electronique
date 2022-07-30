import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Logger } from '@app/core';
const logger = new Logger('SkipService');

const skipKey = 'skip-home';

enum SkipStrategy {
  always = 'always',
  once = 'once'
}

@Injectable()
export class SkipService {
  get ShowAlways(): boolean {
    let skip = localStorage.getItem(skipKey);

    logger.debug('Skip strategy', skip, !skip, skip === SkipStrategy.always);

    // When no skip strategy is set, always show it
    if (!skip) {
      return true;
    }

    // Show the home when the skept it for once
    return skip === SkipStrategy.once;
  }

  constructor() {}

  SkipHome(showOnStartup: boolean): Observable<SkipStrategy> {
    let strategy = showOnStartup ? SkipStrategy.once : SkipStrategy.always;
    localStorage.setItem(skipKey, strategy);

    return of(strategy);
  }
}
