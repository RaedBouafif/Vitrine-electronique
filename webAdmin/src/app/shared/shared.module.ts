import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { BootstrapModule } from '@app/bootstrap/bootstrap.module';
import { CardsModule } from '@app/blocks/cards/cards.module';
import { FormControlsModule } from '@app/blocks/form-controls/form-controls.module';
import { IconsModule } from '@app/blocks/icons/icons.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { UnsanitizePipe } from './pipes/unsanitize.pipe';

const exportModules = [
  // external modules
  CommonModule,
  HttpClientModule,
  RouterModule,
  TranslateModule,
  PerfectScrollbarModule,
  FormsModule,
  ReactiveFormsModule,
  // custom modules
  BootstrapModule,
  CardsModule,
  IconsModule,
  FormControlsModule,
  NgSelectModule
];

@NgModule({
  declarations: [UnsanitizePipe],
  imports: [...exportModules],
  exports: [UnsanitizePipe, ...exportModules]
})
export class SharedModule {}
