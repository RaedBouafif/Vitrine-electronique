import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@app/blocks/icons/icons.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ContextMenuComponent } from './context-menu/context-menu.component';
import { NavLinkComponent } from './nav-link/nav-link.component';
import { BreadcrumComponent } from './breadcrum/breadcrum.component';
import { DropdownIconComponent } from './dropdown-icon/dropdown-icon.component';
import { TabbarComponent } from './tabbar/tabbar.component';

const exports = [
  ContextMenuComponent,
  NavLinkComponent,
  BreadcrumComponent,
  DropdownIconComponent,
  TabbarComponent
];

@NgModule({
  declarations: [...exports],
  imports: [
    CommonModule,
    BsDropdownModule,
    PerfectScrollbarModule,
    IconsModule,
    RouterModule
  ],
  exports
})
export class NavigationsModule {}
