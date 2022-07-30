import {
  Component,
  OnInit,
  AfterContentInit,
  Input,
  ContentChildren,
  QueryList,
  Output,
  EventEmitter,
  forwardRef,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor, Logger } from '@app/core';
import { Subject, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseRadio } from '../radio/base-radio';

const logger = new Logger('RadioGroupComponent');

@Component({
  selector: 'prx-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ]
})
export class RadioGroupComponent extends BaseControlValueAccessor<any>
  implements OnInit, AfterContentInit, OnDestroy {
  protected destroy$ = new Subject<void>();
  protected _name: string;

  @Input()
  get value(): any {
    return this._value;
  }
  set value(value: any) {
    this._value = value;
    this.checkSelectedRadio();
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = disabled;
    //this.updateDisabled();
  }

  @Input()
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
    //this.updateNames();
  }

  @Input()
  inline: boolean;

  @ContentChildren(
    forwardRef(() => BaseRadio),
    { descendants: true }
  )
  radios: QueryList<BaseRadio>;

  @Output() valueChanged: EventEmitter<any> = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterContentInit() {
    logger.debug(this.radios);
    this.updateAllAndWatchForChanges();

    this.radios.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      logger.debug('Changes triggered');
      this.updateAllAndWatchForChanges();
    });
  }

  protected updateRadios() {
    if (this.radios) {
      setTimeout(() => {
        this.radios.forEach(radio => {
          radio.name = this.name;

          if (typeof this.disabled !== 'undefined') {
            radio.disabled = this.disabled;
          }

          if (typeof this.inline !== 'undefined') {
            radio.inline = this.inline;
          }
        });
      });
    }
  }

  protected checkSelectedRadio() {
    logger.debug('checkSelectedRadio - value:', this.value);

    setTimeout(() => {
      if (this.radios && typeof this.value !== 'undefined') {
        this.radios.forEach(
          radio => (radio.checked = radio.value === this.value)
        );
      }
    });
  }

  protected updateAllAndWatchForChanges() {
    logger.debug('Update All Triggered');
    this.updateRadios();
    this.checkSelectedRadio();
    this.subscribeOnRadiosValueChange();
  }

  protected subscribeOnRadiosValueChange() {
    if (!this.radios || !this.radios.length) {
      return;
    }

    merge(...this.radios.map(radio => radio.valueChanged))
      .pipe(takeUntil(merge(this.radios.changes, this.destroy$)))
      .subscribe((value: any) => {
        this.writeValue(value);
        this.propagateValue(value);
      });
  }

  protected propagateValue(value: any) {
    logger.debug('propagateValue:', value);
    this.onChange(value);
    this.valueChanged.emit(value);
  }

  public writeValue(val: any): void {
    super.writeValue(val);
    logger.debug('writeValue:', val);

    if (typeof val !== 'undefined') {
      this.checkSelectedRadio();
    }
  }
}
