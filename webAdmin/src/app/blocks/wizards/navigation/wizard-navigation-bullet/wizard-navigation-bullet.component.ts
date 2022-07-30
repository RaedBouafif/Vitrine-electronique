import { Component, OnInit, Input } from '@angular/core';
import { BaseWizardNavigation } from '../../base-wizard-navigation';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'prx-wizard-navigation-bullet',
  templateUrl: './wizard-navigation-bullet.component.html',
  styleUrls: ['./wizard-navigation-bullet.component.scss']
})
export class WizardNavigationBulletComponent extends BaseWizardNavigation
  implements OnInit {
  arrowLeft = faChevronLeft;
  arrowRight = faChevronRight;

  @Input()
  displayStepsNumber: boolean = true;

  @Input()
  steps: any[];

  constructor() {
    super();
  }

  ngOnInit() {}
}
