import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert';
import { IconsModule } from '@app/blocks/icons/icons.module';

import { AlertComponent } from './alert/alert.component';

const exports = [AlertComponent];

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, AlertModule, IconsModule],
  exports: [...exports]
})
export class AlertsModule {}
