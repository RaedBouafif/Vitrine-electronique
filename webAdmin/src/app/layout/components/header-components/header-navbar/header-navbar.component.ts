import {
  Component,
  OnInit,
  Input,
  HostBinding,
  Output,
  EventEmitter
} from '@angular/core';
import { BaseComponent } from '@app/core';
import { NavigationService } from '@app/layout/services/navigation.service';
import { NavigationOptions } from '@app/layout/models/navigation';

@Component({
  selector: 'prx-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss']
})
export class HeaderNavbarComponent extends BaseComponent implements OnInit {
  navGroups: NavigationOptions[];

  @HostBinding('class.collapsed')
  @Input()
  sidenavCollapsed: boolean;

  @Output()
  sideNavToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private navigation: NavigationService) {
    super('header-navbar');
  }

  ngOnInit() {
    this.navigation
      .getNavigationItems()
      .subscribe(groups => (this.navGroups = groups));
  }

  toggleSidenav() {
    this.sidenavCollapsed = !this.sidenavCollapsed;
    this.sideNavToggled.emit(this.sidenavCollapsed);
  }
}
