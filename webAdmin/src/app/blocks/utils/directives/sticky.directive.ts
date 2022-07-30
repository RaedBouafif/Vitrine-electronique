import {
  Directive,
  OnInit,
  Input,
  ElementRef,
  HostBinding
} from '@angular/core';
import { WindowScrollService } from '../services/window-scroll.service';

/**
 * Provides a way to allow any element to be sticky when it gets out of the viewport
 */
@Directive({
  selector: '[prxSticky]'
})
export class StickyDirective implements OnInit {
  /**
   * If this value is set then will be used as the sticky point for the sticky
   */
  @Input() offset: number;

  get realOffset(): number {
    return this.offset || this._initialOffset;
  }

  private _initialWindowScroll = 0;
  private _initialOffset = 0;

  @HostBinding('class.fixed') isFixedPosition: boolean;

  constructor(
    private element: ElementRef,
    private scrollService: WindowScrollService
  ) {}

  ngOnInit() {
    this.getInitialOffset();
    this.isFixedPosition = this._initialWindowScroll >= this.realOffset;

    this.scrollService.onWindowScroll().subscribe((scrollY: number) => {
      this.isFixedPosition = scrollY >= this.realOffset;
    });
  }

  private getInitialOffset() {
    /* The actual window ScrollY value. It will always be >= 0 */
    let currentScroll = window.scrollY;

    /*
     * The native-element OffsetTop, its value will depend on the window.scrollY value.
     * The value will be decreasing by the scrollY value as it will get close to the viewport's top position.
     * A value > 0 means its top position has not reached the viewport's top.
     * A value < 0 means the element's top has reached the viewport's top.
     */
    let elementOffsetTop = this.element.nativeElement.getBoundingClientRect()
      .top;

    /**
     * Set some initial values
     */
    this._initialWindowScroll = currentScroll;
    this._initialOffset = currentScroll + elementOffsetTop;
  }
}
