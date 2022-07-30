import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';
import { BaseComponent } from '@app/core';

@Component({
  selector: 'prx-accordion-group',
  templateUrl: './accordion-group.component.html',
  styleUrls: ['./accordion-group.component.scss']
})
export class AccordionGroupComponent extends BaseComponent implements OnInit {
  protected _isOpen = false;

  /** turn on/off animation */
  isAnimated = true;

  @Input()
  heading: string;

  @Input()
  isDisabled: boolean;

  @HostBinding('class.accordion-group-open')
  @Input()
  get isOpen(): boolean {
    return this._isOpen;
  }
  set isOpen(value: boolean) {
    if (value !== this.isOpen) {
      this._isOpen = value;
    }
  }

  @Output()
  isOpenChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super('accordion-group');
  }

  ngOnInit() {}

  toggleOpen() {
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
      this.isOpenChange.emit({ target: this, isOpen: this.isOpen });
    }
  }
}
