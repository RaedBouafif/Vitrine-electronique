import { Component, OnInit, Input } from '@angular/core';
import { WizardNavigationStyle } from '../../base-wizard';
import { BaseComponent } from '@app/core';

@Component({
  selector: 'prx-wizard-navigation',
  templateUrl: './wizard-navigation.component.html',
  styleUrls: ['./wizard-navigation.component.scss']
})
export class WizardNavigationComponent extends BaseComponent implements OnInit {
  NavigationStyle = WizardNavigationStyle;

  @Input()
  selectedIndex: number;

  @Input()
  doneUrl: string;

  @Input()
  doneText: string;

  @Input()
  isLastStep: string;

  @Input()
  steps: any[];

  @Input()
  style: WizardNavigationStyle;

  constructor() {
    super();
  }

  ngOnInit() {}
}
