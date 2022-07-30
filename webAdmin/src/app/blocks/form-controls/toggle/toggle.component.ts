import {
  Component,
  OnInit,
  Input,
  forwardRef,
  HostBinding,
  Output,
  EventEmitter
} from '@angular/core';
import { BaseControlValueAccessor } from '@app/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'prx-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
    }
  ]
})
export class ToggleComponent extends BaseControlValueAccessor<boolean>
  implements OnInit {
  /**
   * The checked state of the checkbox
   */
  @Input()
  get checked() {
    return this._value;
  }
  set checked(value: boolean) {
    this._value = value;
  }

  @Input()
  id: string;

  @Input()
  theme: 'light' | 'ios' = 'light';

  /**
   * Event for when the checked state is changed
   * @type EventEmitter<boolean>
   */
  @Output()
  onChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    super();
  }

  ngOnInit() {}

  toggle() {
    this._value = !this._value;
    this.onChanged.emit(this._value);
    this.onChange(this._value);
  }
}
