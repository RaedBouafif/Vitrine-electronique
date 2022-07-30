import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

import { IconComponent } from './components/icon/icon.component';

const featherIcons = allIcons;

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule, FontAwesomeModule, FeatherModule.pick(featherIcons)],
  exports: [FontAwesomeModule, FeatherModule, IconComponent]
})
export class IconsModule {}
