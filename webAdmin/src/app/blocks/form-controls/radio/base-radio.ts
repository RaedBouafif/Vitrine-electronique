import { Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { BaseComponent } from '@app/core';

export class BaseRadio extends BaseComponent {
  private _name: string;
  private _checked: boolean = false;
  private _disabled: boolean = false;
  private _currentId: string;
  private _value: any;

  @Input()
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    if (this._name !== value) {
      this._name = value;
      //this.cd.detectChanges();
    }
  }

  @Input()
  get checked() {
    return this._checked;
  }
  set checked(value: boolean) {
    if (this._checked !== value) {
      this._checked = value;
      //this.cd.markForCheck();
    }
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    if (this._disabled !== disabled) {
      this._disabled = disabled;
      //this.cd.markForCheck();
    }
  }

  @Input()
  get value(): any {
    return this._value;
  }
  set value(value: any) {
    if (this._value !== value) {
      this._value = value;
      //this.cd.markForCheck();
    }
  }

  @Input()
  id: string;

  @HostBinding('class.form-check-inline')
  @Input()
  inline: boolean = false;

  @Output()
  valueChanged: EventEmitter<any> = new EventEmitter<any>();

  get currentId(): string {
    if (!this.id && !this._currentId) this._currentId = this.getId();

    if (this._currentId) return this._currentId;

    return this.id;
  }

  constructor() {
    super('radio');
  }

  toggle(event: Event) {
    event.stopPropagation();
    this.checked = (event.target as HTMLInputElement).checked;
    this.valueChanged.emit(this.value);
  }
}
