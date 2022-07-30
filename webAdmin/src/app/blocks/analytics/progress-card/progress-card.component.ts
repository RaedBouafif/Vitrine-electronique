import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'prx-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.scss']
})
export class ProgressCardComponent implements OnInit {
  @Input()
  value: number;

  constructor() {}

  ngOnInit() {}
}
