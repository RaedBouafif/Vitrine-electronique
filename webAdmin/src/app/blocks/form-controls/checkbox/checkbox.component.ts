import {
  Component,
  OnInit,
  Input,
  forwardRef,
  HostBinding,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { BaseControlValueAccessor, Logger } from '@app/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const logger = new Logger('CheckboxComponent');

@Component({
  selector: 'prx-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent extends BaseControlValueAccessor<boolean>
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

  /**
   * The disabled state of the checkbox
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
  }

  /**
   * Whether apply a shadow style to ehe checkbox
   */
  @Input()
  shadow: boolean;

  @Input()
  id: string;

  @Input()
  label: string;

  @Input()
  name: string;

  _currentId: string;
  get currentId(): string {
    if (!this.id && !this._currentId) this._currentId = this.getId();

    if (this._currentId) return this._currentId;

    return this.id;
  }

  @HostBinding('class.form-check-inline')
  @Input()
  inline: boolean = false;

  /**
   * Event for when the checked state is changed
   * @type EventEmitter<boolean>
   */
  @Output()
  onChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    super('checkbox');
  }

  ngOnInit() {}

  toggle() {
    this.checked = !this.checked;
    this.onChanged.emit(this.checked);
    this.onChange(this.checked);

    logger.debug(`${this.currentId},${this.checked}`);
  }
}
