import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  forwardRef
} from '@angular/core';
import { BaseRadio } from './base-radio';

@Component({
  selector: 'prx-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: BaseRadio,
      useExisting: forwardRef(() => RadioComponent)
    }
  ]
})
export class RadioComponent extends BaseRadio implements OnInit {
  @Input()
  shadow: boolean;

  @Input()
  label: string;

  constructor(protected cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {}
}
