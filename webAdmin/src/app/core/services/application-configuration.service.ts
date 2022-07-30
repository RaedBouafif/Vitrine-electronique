import { Injectable } from '@angular/core';
import { LayoutService } from './layout.service';
import { LayoutModel } from '../models/layout.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationConfigurationService {
  get layout(): LayoutModel {
    return this._layout.layoutConfiguration;
  }

  constructor(private _layout: LayoutService) {}

  initialize() {
    return new Promise(resolve => {
      this._layout.initializeLayout();
      resolve();
    });
  }
}
