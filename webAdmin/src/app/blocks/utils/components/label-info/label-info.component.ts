import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '@app/core';

@Component({
  selector: 'prx-label-info',
  templateUrl: './label-info.component.html',
  styleUrls: ['./label-info.component.scss']
})
export class LabelInfoComponent extends BaseComponent implements OnInit {
  @Input()
  label: string;

  constructor() {
    super();
  }

  ngOnInit() {}
}
