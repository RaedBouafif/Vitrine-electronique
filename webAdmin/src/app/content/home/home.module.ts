import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { UtilsModule } from '@app/blocks/utils';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { WizardsModule } from '@app/blocks/wizards/wizards.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { HomeStepComponent } from './components/home-step/home-step.component';

import { SkipService } from './services/skip.service';

@NgModule({
  imports: [SharedModule, UtilsModule, WizardsModule, HomeRoutingModule],
  declarations: [
    HomeComponent,
    WelcomeComponent,
    HomeStepComponent,
    GetStartedComponent
  ],
  providers: [SkipService]
})
export class HomeModule {}
