import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsModule } from '../cards/cards.module';
import { ProgressModule } from '../progress/progress.module';

import { ProgressCardComponent } from './progress-card/progress-card.component';
import { StatCardComponent } from './stat-card/stat-card.component';
import { ValueProgressComponent } from './value-progress/value-progress.component';

const exports = [
  ProgressCardComponent,
  StatCardComponent,
  ValueProgressComponent
];

@NgModule({
  declarations: [...exports],
  imports: [CommonModule, ProgressModule, CardsModule],
  exports
})
export class AnalyticsModule {}
