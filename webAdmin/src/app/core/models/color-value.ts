export interface ColorValue {
  name: string;
  value: string | Array<ColorValue>;
}

export interface ColorArray {
  name: string;
  value: Array<ColorValue>;
}
