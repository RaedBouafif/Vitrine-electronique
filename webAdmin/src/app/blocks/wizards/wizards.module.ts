import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { IconsModule } from '../icons/icons.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormControlsModule } from '../form-controls/form-controls.module';

import { WizardNavigationComponent } from './navigation/wizard-navigation/wizard-navigation.component';
import { BaseWizard } from './base-wizard';

import { WizardStepComponent } from './wizard-step/wizard-step.component';
import { WizardCircledComponent } from './wizard-circled/wizard-circled.component';
import { WizardBulletedComponent } from './wizard-bulleted/wizard-bulleted.component';
import { WizardNavigationBulletComponent } from './navigation/wizard-navigation-bullet/wizard-navigation-bullet.component';
import { NavigationsModule } from '../navigations/navigations.module';
import { WizardNavigationPrevNextComponent } from './navigation/wizard-navigation-prev-next/wizard-navigation-prev-next.component';
import { WizardTabbedComponent } from './wizard-tabbed/wizard-tabbed.component';

const exports = [
  WizardCircledComponent,
  WizardBulletedComponent,
  WizardTabbedComponent,
  WizardStepComponent
];

@NgModule({
  declarations: [
    BaseWizard,
    WizardNavigationComponent,
    WizardNavigationBulletComponent,
    WizardNavigationPrevNextComponent,
    ...exports
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    CdkStepperModule,
    IconsModule,
    NavigationsModule,
    FormControlsModule
  ],
  exports: [...exports]
})
export class WizardsModule {}
