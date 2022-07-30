import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSolidComponent } from './progress-solid/progress-solid.component';
import {
  ProgressbarModule,
  ProgressbarComponent
} from 'ngx-bootstrap/progressbar';

@NgModule({
  declarations: [ProgressSolidComponent],
  imports: [CommonModule, ProgressbarModule],
  exports: [ProgressSolidComponent, ProgressbarComponent, ProgressbarModule]
})
export class ProgressModule {}
