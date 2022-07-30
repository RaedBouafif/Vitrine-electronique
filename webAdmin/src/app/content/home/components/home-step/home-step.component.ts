import { Component, OnInit, Input } from '@angular/core';
import { StepModel } from '../../models/step';

@Component({
  selector: 'prx-home-step',
  templateUrl: './home-step.component.html',
  styleUrls: ['./home-step.component.scss']
})
export class HomeStepComponent implements OnInit {
  @Input()
  step: StepModel;

  constructor() {}

  ngOnInit() {}
}
