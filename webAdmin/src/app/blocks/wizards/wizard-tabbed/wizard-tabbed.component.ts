import { Component, OnInit } from '@angular/core';
import { BaseWizard } from '../base-wizard';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'prx-wizard-tabbed',
  templateUrl: './wizard-tabbed.component.html',
  styleUrls: ['./wizard-tabbed.component.scss'],
  providers: [
    { provide: BaseWizard, useExisting: WizardTabbedComponent },
    { provide: CdkStepper, useExisting: WizardTabbedComponent }
  ]
})
export class WizardTabbedComponent extends BaseWizard implements OnInit {
  ngOnInit() {}
}
