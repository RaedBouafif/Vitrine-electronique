import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '@app/core';

@Component({
  selector: 'prx-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
export class FlagComponent extends BaseComponent implements OnInit {
  @Input()
  flag: string;

  @Input()
  size: 'sm' | 'md' | 'lg' = 'sm';

  constructor() {
    super();
  }

  ngOnInit() {}
}
