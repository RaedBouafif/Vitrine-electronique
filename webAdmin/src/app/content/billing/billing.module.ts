import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { NavigationsModule } from '@app/blocks/navigations/navigations.module';
import { ProgressModule } from '@app/blocks/progress/progress.module';
import { BillingRoutingModule } from './billing-routing.module';

import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { AvatarsModule } from '@app/blocks/avatars/avatars.module';
import { UtilsModule } from '@app/blocks/utils';

@NgModule({
  declarations: [...BillingRoutingModule.declarations, InvoiceDetailsComponent],
  imports: [
    SharedModule,
    UtilsModule,
    AvatarsModule,
    NavigationsModule,
    ProgressModule,
    BillingRoutingModule
  ]
})
export class BillingModule {}
