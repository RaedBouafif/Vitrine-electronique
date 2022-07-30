export enum Layouts {
  VerticalDefault = 'vertical-default',
  HorizontalDefault = 'horizontal-default'
}

export interface LayoutModel {
  style: 'vertical' | 'horizontal';
  name: string;
  vertical?: LayoutVerticalConfigurationModel;
  horizontal?: LayoutHorizontalConfigurationModel;
}

export interface LayoutConfigurationModel {
  fixedHeader: boolean;
}

export interface LayoutVerticalConfigurationModel
  extends LayoutConfigurationModel {
  fixedSideNav: true;
  sidenavCollapsed: false;
}

export interface LayoutHorizontalConfigurationModel
  extends LayoutConfigurationModel {}
