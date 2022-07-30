import {
  Component,
  forwardRef,
  SkipSelf,
  Optional,
  Inject
} from '@angular/core';
import {
  CdkStep,
  StepperOptions,
  STEPPER_GLOBAL_OPTIONS
} from '@angular/cdk/stepper';
import { BaseWizard } from '../base-wizard';

@Component({
  selector: 'prx-wizard-step',
  templateUrl: './wizard-step.component.html',
  styleUrls: ['./wizard-step.component.scss'],
  providers: [{ provide: CdkStep, useExisting: WizardStepComponent }]
})
export class WizardStepComponent extends CdkStep {
  constructor(
    @Inject(forwardRef(() => BaseWizard)) stepper: BaseWizard,
    @Optional() @Inject(STEPPER_GLOBAL_OPTIONS) stepperOptions?: StepperOptions
  ) {
    super(stepper, stepperOptions);
  }

  ngOnInit() {}
}
