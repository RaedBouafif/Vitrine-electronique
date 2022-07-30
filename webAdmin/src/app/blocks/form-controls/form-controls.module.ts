import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { IconsModule } from '../icons/icons.module';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { ButtonComponent } from './button/button.component';
import { ButtonLanguageSelectorComponent } from './button-language-selector/button-language-selector.component';

import { ToggleComponent } from './toggle/toggle.component';
import { RadioCardComponent } from './radio-card/radio-card.component';
import { CardsModule } from '../cards/cards.module';
import { RadioComponent } from './radio/radio.component';
import { RadioGroupComponent } from './radio-group/radio-group.component';

const exports = [
  CheckboxComponent,
  ButtonComponent,
  ButtonLanguageSelectorComponent,
  ToggleComponent,
  RadioCardComponent,
  RadioComponent,
  RadioGroupComponent
];

const exportsModule = [FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [...exports],
  imports: [
    CommonModule,
    IconsModule,
    BsDropdownModule,
    TranslateModule,
    CardsModule,
    ...exportsModule
  ],
  exports: [...exports, ...exportsModule]
})
export class FormControlsModule {}
