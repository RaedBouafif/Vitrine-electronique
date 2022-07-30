import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ColorScheme, BaseComponent } from '@app/core';
import { AlertStyle } from '../models/alert-style.enum';

@Component({
  selector: 'prx-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent extends BaseComponent implements OnInit {
  AlertStyle = AlertStyle;

  @Input()
  scheme: ColorScheme;

  @Input()
  background: ColorScheme;

  @Input()
  style: AlertStyle;

  @Input()
  withIcon: boolean;

  @Input()
  dismissible: boolean;

  get icon(): string {
    let icon: string;

    switch (this.scheme) {
      case ColorScheme.Primary:
      case ColorScheme.Light:
      case ColorScheme.Gray:
      case ColorScheme.GrayLight:
      case ColorScheme.Contrast:
        icon = 'alert-circle';
        break;
      case ColorScheme.Info:
        icon = 'info';
        break;
      case ColorScheme.Warning:
      case ColorScheme.Danger:
      case ColorScheme.Alternate:
        icon = 'alert-triangle';
        break;
      case ColorScheme.Success:
        icon = 'check-circle';
        break;
      default:
        icon = 'help-circle';
        break;
    }

    return icon;
  }

  get fullScheme(): string {
    return `${this.scheme} ${this.scheme === ColorScheme.Light ? 'border' : ''} 
    ${this.style ? 'alert-' + this.style : ''}
    ${this.background ? 'bg-' + this.background : ''}`;
  }

  constructor() {
    super();
  }

  ngOnInit() {}
}
