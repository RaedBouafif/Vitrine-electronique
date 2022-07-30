import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { NavigationOptions } from '@app/layout/models/navigation';
import { BaseComponent } from '@app/core';

@Component({
  selector: 'prx-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss']
})
export class SidenavItemComponent extends BaseComponent implements OnInit {
  @Input()
  option: NavigationOptions;

  @HostBinding('class.collapsed')
  @Input()
  collapsed: boolean;

  @HostBinding('class.hover')
  @Input()
  hover: boolean;

  @Input()
  showTitle: boolean = true;

  @Input()
  showToggler: boolean = true;

  @HostBinding('class.nav-dropdown')
  get hasDropDown(): boolean {
    return !!this.option.items;
  }

  @HostBinding('class.level-2')
  get paddingFromLevel(): boolean {
    return this.option.level === 2;
  }

  constructor() {
    super('nav-item');
  }

  ngOnInit() {}
}
