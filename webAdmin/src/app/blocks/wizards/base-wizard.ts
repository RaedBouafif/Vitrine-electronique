import { Directive, Input } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';

export enum WizardNavigationStyle {
  PrevNext,
  Bullet
}

@Directive({
  selector: '[prxWizard]',
  providers: [{ provide: CdkStepper, useExisting: BaseWizard }]
})
export class BaseWizard extends CdkStepper {
  @Input()
  doneUrl: string;

  @Input()
  doneText: string;

  @Input()
  navigation: WizardNavigationStyle = WizardNavigationStyle.PrevNext;
}
