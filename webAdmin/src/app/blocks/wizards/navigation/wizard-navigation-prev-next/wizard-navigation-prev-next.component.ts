import { Component, OnInit } from '@angular/core';
import { BaseWizardNavigation } from '../../base-wizard-navigation';

@Component({
  selector: 'prx-wizard-navigation-prev-next',
  templateUrl: './wizard-navigation-prev-next.component.html',
  styleUrls: ['./wizard-navigation-prev-next.component.scss']
})
export class WizardNavigationPrevNextComponent extends BaseWizardNavigation
  implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
