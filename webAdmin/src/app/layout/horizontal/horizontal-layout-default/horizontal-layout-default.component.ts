import { Component, OnInit } from '@angular/core';
import { BaseLayout } from '../../base/base-layout';

@Component({
  selector: 'prx-horizontal-layout-default',
  templateUrl: './horizontal-layout-default.component.html',
  styleUrls: ['./horizontal-layout-default.component.scss']
})
export class HorizontalLayoutDefaultComponent extends BaseLayout
  implements OnInit {
  isSidenavCollapsed: boolean;

  constructor() {
    super();
  }

  ngOnInit() {}

  onSidenavToggled(collapsed: boolean) {
    this.isSidenavCollapsed = collapsed;
  }
}
