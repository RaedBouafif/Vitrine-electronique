import { NgModule } from '@angular/core';
import { UtilsModule } from '@app/blocks/utils';
import { AvatarsModule } from '@app/blocks/avatars/avatars.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NavigationsModule } from '@app/blocks/navigations/navigations.module';
import { ProgressModule } from '@app/blocks/progress/progress.module';
import { AnalyticsModule } from '@app/blocks/analytics/analytics.module';
import { FormControlsModule } from '@app/blocks/form-controls/form-controls.module';
import { AlertsModule } from '@app/blocks/alerts/alerts.module';
import { DatePickersModule } from '@app/blocks/date-pickers/date-pickers.module';
import { TimelinesModule } from '@app/blocks/timelines/timelines.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '@app/shared';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [SettingsRoutingModule.declarations],
  imports: [
    CKEditorModule,
    SharedModule,
    UtilsModule,
    AvatarsModule,
    NavigationsModule,
    TimelinesModule,
    ProgressModule,
    AnalyticsModule,
    NgxDatatableModule,
    FormControlsModule,
    AlertsModule,
    DatePickersModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule {}
