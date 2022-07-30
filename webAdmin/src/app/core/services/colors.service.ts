import { Injectable } from '@angular/core';
import { ColorScheme } from './style.service';

export interface ThemeColor {
  name: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  get ThemeColors(): ThemeColor[] {
    return Object.keys(ColorScheme).map(key => {
      return { name: key, value: ColorScheme[key] };
    });
  }
}
