import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { BaseRadio } from '../radio/base-radio';
import { ColorScheme } from '@app/core';

@Component({
  selector: 'prx-radio-card',
  templateUrl: './radio-card.component.html',
  styleUrls: ['./radio-card.component.scss'],
  providers: [
    {
      provide: BaseRadio,
      useExisting: forwardRef(() => RadioCardComponent)
    }
  ]
})
export class RadioCardComponent extends BaseRadio implements OnInit {
  check = faCheck;

  @Input()
  showMark: boolean = false;

  @Input()
  theme: ColorScheme = ColorScheme.Primary;

  constructor() {
    super();
  }

  hostClasses() {
    const classes = super.hostClasses();

    return [...classes, `radio-${this.theme}`];
  }

  ngOnInit() {}
}
