import { Component, OnInit } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { BaseWizard } from '../base-wizard';

@Component({
  selector: 'prx-wizard-circled',
  templateUrl: './wizard-circled.component.html',
  styleUrls: ['./wizard-circled.component.scss'],
  providers: [
    { provide: BaseWizard, useExisting: WizardCircledComponent },
    { provide: CdkStepper, useExisting: WizardCircledComponent }
  ]
})
export class WizardCircledComponent extends BaseWizard implements OnInit {
  ngOnInit() {}
}
