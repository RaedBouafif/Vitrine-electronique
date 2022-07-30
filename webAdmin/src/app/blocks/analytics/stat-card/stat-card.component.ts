import { Component, OnInit, Input } from '@angular/core';

export enum StatType {
  icon = 'icon',
  chart = 'chart'
}

@Component({
  selector: 'prx-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent implements OnInit {
  StatType = StatType;

  @Input()
  title: string;

  @Input()
  heading: string;

  @Input()
  badge: string;

  @Input()
  type: StatType;

  constructor() {}

  ngOnInit() {}
}
