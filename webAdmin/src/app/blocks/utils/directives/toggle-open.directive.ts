import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[toggle-open]'
})
export class ToggleOpenDirective {
  @HostBinding('class.open') isOpen: boolean;

  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
  }
}
