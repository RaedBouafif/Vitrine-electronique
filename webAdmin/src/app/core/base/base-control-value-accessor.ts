import { ControlValueAccessor } from '@angular/forms';
import { BaseComponent } from './base-component';

export class BaseControlValueAccessor<T> extends BaseComponent
  implements ControlValueAccessor {
  public _disabled = false;

  /**
   * Call when value has changed programmatically
   */
  public onChange(newVal: T) {}
  public onTouched(_?: any) {}
  public _value: T;

  /**
   * Model -> View changes
   */
  public writeValue(val: T): void {
    this._value = val;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
}
