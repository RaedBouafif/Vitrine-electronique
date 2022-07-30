import { Component } from '@angular/core';
import { BaseWizard } from '../base-wizard';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'prx-wizard-bulleted',
  templateUrl: './wizard-bulleted.component.html',
  styleUrls: ['./wizard-bulleted.component.scss'],
  providers: [
    { provide: BaseWizard, useExisting: WizardBulletedComponent },
    { provide: CdkStepper, useExisting: WizardBulletedComponent }
  ]
})
export class WizardBulletedComponent extends BaseWizard {
  ngOnInit() {}
}
