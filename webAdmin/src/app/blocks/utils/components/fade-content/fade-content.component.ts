import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '@app/core';

@Component({
  selector: 'prx-fade-content',
  templateUrl: './fade-content.component.html',
  styleUrls: ['./fade-content.component.scss']
})
export class FadeContentComponent extends BaseComponent implements OnInit {
  @Input()
  contentClass: string;

  @Input()
  height: number;

  constructor() {
    super();
  }

  ngOnInit() {}
}
