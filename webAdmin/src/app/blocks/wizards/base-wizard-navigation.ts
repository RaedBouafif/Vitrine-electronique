import { Input } from '@angular/core';
import {
  faLongArrowAltLeft,
  faLongArrowAltRight
} from '@fortawesome/free-solid-svg-icons';

export class BaseWizardNavigation {
  arrowLeft = faLongArrowAltLeft;
  arrowRight = faLongArrowAltRight;

  @Input()
  selectedIndex: number;

  @Input()
  doneUrl: string;

  @Input()
  doneText: string;

  @Input()
  isLastStep: string;
}
