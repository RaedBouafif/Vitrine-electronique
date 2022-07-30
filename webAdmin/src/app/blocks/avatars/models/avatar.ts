export interface Avatar {
  name: string;
  picture?: string;
  status?: string;
  file?: File;
}

export interface AvatarListItem {
  avatar: Avatar;
  placeholderBgColor?: string;
}

export enum AvatarSize {
  sm = 'sm',
  md = 'md',
  regular = ''
}
