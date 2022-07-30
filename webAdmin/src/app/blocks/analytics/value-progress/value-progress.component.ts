import { Component, OnInit, Input } from '@angular/core';
import { ColorScheme } from '@app/core';

@Component({
  selector: 'prx-value-progress',
  templateUrl: './value-progress.component.html',
  styleUrls: ['./value-progress.component.scss']
})
export class ValueProgressComponent implements OnInit {
  @Input()
  value: number;

  @Input()
  pipe: 'currency' | 'number';

  @Input()
  format: string;

  @Input()
  percent: number;

  @Input()
  title: string;

  @Input()
  scheme: ColorScheme;

  constructor() {}

  ngOnInit() {}
}
