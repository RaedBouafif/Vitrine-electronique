import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter,
  OnInit,
  Input
} from '@angular/core';

import { Logger } from '@app/core';
const logger = new Logger('OpenParentDirective');

@Directive({
  selector: '[openParent]'
})
export class OpenParentDirective {
  isOpen: boolean = false;

  @Output()
  onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('click', ['$event'])
  onClick(e: Event) {
    e.stopPropagation();
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this._renderer.addClass(
        this._elementRef.nativeElement.parentNode,
        'open'
      );
    } else {
      this._renderer.removeClass(
        this._elementRef.nativeElement.parentNode,
        'open'
      );
    }

    this.onToggle.emit(this.isOpen);
  }

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _renderer: Renderer2
  ) {}
}
