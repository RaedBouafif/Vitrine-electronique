import { Injectable } from '@angular/core';
import { LayoutModel, Layouts } from '../models/layout.model';

const ConfigKey = 'prx-layout-config';
const DefaultConfig: LayoutModel = {
  style: 'vertical',
  name: 'default',
  vertical: {
    fixedHeader: true,
    fixedSideNav: true,
    sidenavCollapsed: false
  },
  horizontal: {
    fixedHeader: true
  }
};

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private _config: LayoutModel;

  get layoutConfiguration(): LayoutModel {
    return this._config;
  }

  get layoutToUse(): Layouts {
    const style = this._config.style;
    const name = this._config.name;

    if (style === 'vertical') {
      // Vertical Layouts
      if (name === 'default') {
        return Layouts.VerticalDefault;
      }
    } else {
      // Horizontal Layouts
      if (name === 'default') {
        return Layouts.HorizontalDefault;
      }
    }

    // Default layout in case no one is found
    return Layouts.VerticalDefault;
  }

  constructor() {}

  /**
   * Try to get the configuration from localstorage
   */
  private loadLayoutConfig(): LayoutModel {
    const config = localStorage.getItem(ConfigKey);

    return config ? JSON.parse(config) : DefaultConfig;
  }

  /**
   * Stores the layout configuration to localStorage
   * @param layout The layout configuration
   */
  saveLayout(layout: LayoutModel) {
    localStorage.setItem(ConfigKey, JSON.stringify(layout));
  }

  initializeLayout() {
    this._config = this.loadLayoutConfig();
    this.saveLayout(this._config);
  }

  reload(config: LayoutModel) {
    this.saveLayout(config);
    this._config = config;
  }
}
