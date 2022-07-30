import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faBars, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from '@app/core';
import { Admin } from '@app/core/_models/user/Admin';

@Component({
  selector: 'prx-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss']
})
export class HeaderToolbarComponent extends BaseComponent implements OnInit {
  icons = {
    faBars,
    faAlignRight
  };

  @Input()
  quickSidenavCollapsed: boolean;

  @Input()
  sidenavCollapsed: boolean;

  @Output()
  quickSidenavToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  sidenavToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  branded: boolean = false;

  @Input()
  user: Admin;

  @Input()
  credential: any;

  menuHidden = true;

  constructor() {
    super('header-toolbar');
  }

  toggleQuickSidenav() {
    this.quickSidenavCollapsed = !this.quickSidenavCollapsed;
    this.quickSidenavToggled.emit(this.quickSidenavCollapsed);
  }

  toggleSidenav() {
    this.sidenavCollapsed = !this.sidenavCollapsed;
    this.sidenavToggled.emit(this.sidenavCollapsed);
  }

  ngOnInit() {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }
}
