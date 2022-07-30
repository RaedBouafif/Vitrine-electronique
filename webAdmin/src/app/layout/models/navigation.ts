export interface NavigationOptions {
  title: string;
  link?: string;
  icon?: NavigationIcon;
  level?: number;
  items?: NavigationOptions[];
  target?: string;
}

export interface NavigationIcon {
  name?: any;
  letter?: string;
  size?: string;
}
