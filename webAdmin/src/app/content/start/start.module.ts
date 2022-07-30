import { NgModule } from '@angular/core';
import { ProgressModule } from '@app/blocks/progress/progress.module';
import { NavigationsModule } from '@app/blocks/navigations/navigations.module';
import { AnalyticsModule } from '@app/blocks/analytics/analytics.module';
import { UtilsModule } from '@app/blocks/utils';
import { StartRoutingModule } from './start-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { SocialMetricsComponent } from './social-metrics/social-metrics.component';
import { SharedModule } from '@app/shared';
@NgModule({
  declarations: [WelcomeComponent, SocialMetricsComponent],
  imports: [
    SharedModule,
    UtilsModule,
    StartRoutingModule,
    AnalyticsModule,
    ProgressModule,
    NavigationsModule
  ]
})
export class StartModule {}
