import { Injectable } from '@angular/core';
import { ColorValue } from '../models/color-value';

/**
 * TODO: Load SCSS variables inside TS files directly to avoid maintaining two versions.
 * https://github.com/angular/angular-cli/issues/8674
 * It appears the clis still doesn't allow that
 *
 * At this moment if you change a color from the scheme of your theme, ir will need to be changed here as well
 */
@Injectable({
  providedIn: 'root'
})
export class StyleService {
  get White(): string {
    return '#ffffff';
  }

  get Black(): string {
    return '#161c2d';
  }

  public get GrayScale(): Gray {
    return {
      gray100: '#f9fbfd',
      gray200: '#f1f4f8',
      gray300: '#d9e2ef',
      gray400: '#c6d3e6',
      gray500: '#abbcd5',
      gray600: '#869ab8',
      gray700: '#506690',
      gray800: '#384c74',
      gray900: '#2b354f'
    };
  }

  get Color1(): ColorVariation {
    return this.createVariation(
      'ffd4ff',
      'f4b4ff',
      'cd92ff',
      'a772ff',
      '8053ff',
      '5533ff',
      '4f2ca9',
      '3f179a',
      '30138e',
      '13007a',
      '001a3e'
    );
  }

  get Color2(): ColorVariation {
    return this.createVariation(
      'c0deed',
      '97c9e9',
      '80bfe7',
      '67b4e5',
      '47aae2',
      '00a0e0',
      '0083dd',
      '00619b',
      '00447b',
      '00295c',
      '001f4f'
    );
  }

  get Color3(): ColorVariation {
    return this.createVariation(
      'd5eeea',
      'ade4db',
      '80dacc',
      '67d4c5',
      '47cfbe',
      '00c9b7',
      '00a190',
      '007a6b',
      '005448',
      '003128',
      '00200f'
    );
  }

  get Color4(): ColorVariation {
    return this.createVariation(
      'afd4fa',
      '95c2ec',
      '7bb0df',
      '009cf7',
      '5f9ed2',
      '00a9cc',
      '0087a9',
      '006787',
      '004867',
      '084166',
      '002b48'
    );
  }

  get Color5(): ColorVariation {
    return this.createVariation(
      'edf2f9',
      'dce3e7',
      'b7c0d7',
      '8d96ac',
      '6d768b',
      '4f586c',
      '40495d',
      '3d4256',
      '323b4e',
      '27333e',
      '131d2d'
    );
  }

  get Color6(): ColorVariation {
    return this.createVariation(
      'f5dfc3',
      'fad2a4',
      'fdc586',
      'feb868',
      'feab47',
      'fc9e21',
      'e48e1a',
      'ce7e13',
      'b76e0c',
      'a15f06',
      '8c5101'
    );
  }

  get ColorAuxiliary(): ColorVariation {
    return this.createVariation(
      'ffaabf',
      'ffb7c9',
      'ff98ac',
      'ff758e',
      'fc4d6d',
      'f5365c',
      'ec2755',
      'd10042',
      'b0002c',
      '900017',
      '710000'
    );
  }

  get palette(): ColorPalette {
    return {
      colorPrimary: this.Color1.base,
      colorSecondary: this.GrayScale.gray700,
      colorSuccess: this.Color3.base,
      colorInfo: this.Color2.dark,
      colorWarning: this.Color6.light2x,
      colorDanger: this.ColorAuxiliary.base,
      colorLight: this.GrayScale.gray100,
      colorDark: this.GrayScale.gray900,

      colorGray: this.GrayScale.gray600,
      colorGrayLight: this.GrayScale.gray300,
      colorAlternate: this.Color6.base,
      colorContrast: this.White,
      colorDarker: this.Color1.dark5x,
      colorBlack: this.Black
    };
  }

  get brands() {
    return {
      facebook: '#3b5998',
      google: '#dd4b39',
      gplus: '#dd4b39',
      twitter: '#00aced',
      linkedin: '#007bb6',
      pinterest: '#cb2027',
      git: '#666666',
      tumblr: '#32506d',
      vimeo: '#aad450',
      youtube: '#bb0000',
      flickr: '#ff0084',
      reddit: '#ff4500',
      dribbble: '#ea4c89',
      skype: '#00aff0',
      instagram: '#517fa4',
      lastfm: '#c3000d',
      soundcloud: '#ff8800',
      behance: '#1769ff',
      envato: '#82b541',
      medium: '#00ab6c',
      spotify: '#1db954',
      quora: '#a82400',
      xing: '#026466',
      snapchat: '#fffc00',
      telegram: '#0088cc',
      whatsapp: '#075e54',
      rss: '#f26522'
    };
  }

  constructor() {}

  private createVariation(
    light5x: string,
    light4x: string,
    light3x: string,
    light2x: string,
    light: string,
    base: string,
    dark: string,
    dark2x: string,
    dark3x: string,
    dark4x: string,
    dark5x: string
  ): ColorVariation {
    return {
      light5x: `#${light5x}`,
      light4x: `#${light4x}`,
      light3x: `#${light3x}`,
      light2x: `#${light2x}`,
      light: `#${light}`,
      base: `#${base}`,
      dark: `#${dark}`,
      dark2x: `#${dark2x}`,
      dark3x: `#${dark3x}`,
      dark4x: `#${dark4x}`,
      dark5x: `#${dark5x}`
    };
  }

  private parseObject(color: any): ColorValue[] {
    return Object.keys(color).map(key => {
      return { name: key, value: color[key] };
    });
  }

  public properties(): ColorValue[] {
    const properties = Reflect.ownKeys(this.constructor.prototype).filter(
      property => {
        const descriptor = Reflect.getOwnPropertyDescriptor(
          this.constructor.prototype,
          property
        );

        return typeof descriptor['get'] === 'function';
      }
    ) as string[];

    return properties.map(property => {
      const isObject = typeof this[property] === 'object';

      return {
        name: property,
        value: isObject ? this.parseObject(this[property]) : this[property]
      };
    });
  }

  public toRgba(hex: string, alpha: number) {
    hex = hex.replace('#', '');

    var r = parseInt(
      hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2),
      16
    );
    var g = parseInt(
      hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4),
      16
    );
    var b = parseInt(
      hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6),
      16
    );

    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  }

  public gradient(
    ctx: CanvasRenderingContext2D,
    color: string,
    y: number,
    opacity: number
  ) {
    var gradientFill = ctx.createLinearGradient(0, 0, 0, y);
    gradientFill.addColorStop(0, this.toRgba(color, opacity));
    gradientFill.addColorStop(1, this.toRgba('#ffffff', opacity));

    return gradientFill;
  }
}

export enum ColorScheme {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Danger = 'danger',
  Light = 'light',
  Dark = 'dark',

  Gray = 'gray',
  GrayLight = 'gray-light',
  Alternate = 'alternate',
  Contrast = 'contrast',
  Darker = 'darker',
  Black = 'black'
}

export interface ColorPalette {
  colorPrimary: string;
  colorSecondary: string;
  colorSuccess: string;
  colorInfo: string;
  colorWarning: string;
  colorDanger: string;
  colorLight: string;
  colorDark: string;

  colorGray: string;
  colorGrayLight: string;
  colorAlternate: string;
  colorContrast: string;
  colorDarker: string;
  colorBlack: string;
}

export interface ColorVariation {
  light5x: string;
  light4x: string;
  light3x: string;
  light2x: string;
  light: string;
  base: string;
  dark: string;
  dark2x: string;
  dark3x: string;
  dark4x: string;
  dark5x: string;
}

export interface Gray {
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
}
