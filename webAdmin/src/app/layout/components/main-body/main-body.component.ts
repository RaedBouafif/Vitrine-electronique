import { Component, OnInit, HostBinding } from '@angular/core';
import { LayoutService, Layouts } from '@app/core';

@Component({
  selector: 'prx-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss'],
  host: { class: 'main-body' }
})
export class MainBodyComponent implements OnInit {
  @HostBinding('class.horizontal-default')
  get isHDefault(): boolean {
    return this._layout.layoutToUse === Layouts.HorizontalDefault;
  }

  @HostBinding('class.vertical-default')
  get isVDefault(): boolean {
    return this._layout.layoutToUse === Layouts.VerticalDefault;
  }

  constructor(private _layout: LayoutService) {}

  ngOnInit() {}
}
