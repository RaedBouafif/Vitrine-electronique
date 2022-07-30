import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { IconsModule } from '../icons/icons.module';
import { CardsModule } from '../cards/cards.module';
import { NavigationsModule } from '../navigations/navigations.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { ThemeColorPickerComponent } from './components/theme-color-picker/theme-color-picker.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageOverlayComponent } from './components/page-overlay/page-overlay.component';
import { VerticalTogglerComponent } from './components/vertical-toggler/vertical-toggler.component';
import { FadeContentComponent } from './components/fade-content/fade-content.component';
import { LabelInfoComponent } from './components/label-info/label-info.component';
import { AddressComponent } from './components/address/address.component';
import { HtmlCleanPipe } from './directives/htmlclean.pipe';
import { HtmlPipe } from './directives/html.pipe';
import { ToggleOpenDirective } from './directives/toggle-open.directive';
import { OpenParentDirective } from './directives/open-parent.directive';
import { StickyDirective } from './directives/sticky.directive';
import { FlagComponent } from './components/flag/flag.component';
import { ImgComponent } from './components/img/img.component';

const exports = [
  ThemeColorPickerComponent,
  LoaderComponent,
  PageHeaderComponent,
  PageOverlayComponent,
  VerticalTogglerComponent,
  FadeContentComponent,
  LabelInfoComponent,
  AddressComponent,
  FlagComponent,
  ImgComponent,

  HtmlCleanPipe,
  HtmlPipe,
  ToggleOpenDirective,
  OpenParentDirective,
  StickyDirective
];

@NgModule({
  declarations: [...exports, ImgComponent],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule,
    PerfectScrollbarModule,
    IconsModule,
    CardsModule,
    NavigationsModule
  ],
  exports
})
export class UtilsModule {}
