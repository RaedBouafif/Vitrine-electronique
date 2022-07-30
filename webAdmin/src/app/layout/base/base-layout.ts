import { Input, HostBinding } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export class BaseLayout {
  @HostBinding('class.fixed-header')
  @Input()
  fixedHeader: boolean;

  isQuickSidenavCollapsed: boolean = true;

  closeIcon = faTimes;

  /*
   * Handles the quick side navigation toggled state.
   * This takes the result from the header trigger button and passes it to the quick-side-nav component
   */
  onQuickSidenavToggled(collapsed: boolean) {
    //Quick SideNav is Collapsed/UnCollapsed
    this.isQuickSidenavCollapsed = collapsed;
  }
}
