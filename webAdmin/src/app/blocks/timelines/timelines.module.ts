import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlsModule } from '../form-controls/form-controls.module';

import { VerticalTimelineBasicComponent } from './vertical-timeline-basic/vertical-timeline-basic.component';

const exports = [VerticalTimelineBasicComponent];

@NgModule({
  declarations: [...exports],
  imports: [CommonModule, FormControlsModule],
  exports
})
export class TimelinesModule {}
