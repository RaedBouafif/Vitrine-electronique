import {
  Component,
  OnInit,
  Input,
  HostBinding,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { NavigationOptions } from '@app/layout/models/navigation';
import { BaseComponent, Logger } from '@app/core';

const logger = new Logger('HeaderNavbarItemComponent');

@Component({
  selector: 'prx-header-navbar-item',
  templateUrl: './header-navbar-item.component.html',
  styleUrls: ['./header-navbar-item.component.scss']
})
export class HeaderNavbarItemComponent extends BaseComponent implements OnInit {
  _isOpen: boolean = false;
  angleRight = faAngleRight;

  @Input()
  level: number;

  @Input()
  option: NavigationOptions;

  @Output()
  onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding('class.open')
  get isOpen(): boolean {
    return this._isOpen;
  }
  set isOpen(value: boolean) {
    this._isOpen = value;
    this.onToggle.emit(this._isOpen);
  }

  @HostBinding('class.nav-dropdown')
  get hasDropDown(): boolean {
    return !!this.option.items;
  }

  @HostListener('touchend', ['$event'])
  touchend(e: Event) {
    // Prevent processing mouse events on mobiles
    if (this.hasDropDown) {
      e.preventDefault();
    }

    // Stop bubbling the open so it takes effect on the current item only
    e.stopPropagation();

    this.isOpen = !this.isOpen;

    logger.debug('touchend triggered', this.isOpen);
  }

  @HostListener('mouseenter')
  open() {
    logger.debug('mouseenter triggered');
    this.isOpen = !!this.hasDropDown;
  }

  @HostListener('mouseleave')
  close() {
    logger.debug('mouseleave triggered');
    this.isOpen = false;
  }

  constructor() {
    super('nav-item');
  }

  ngOnInit() {}
}
