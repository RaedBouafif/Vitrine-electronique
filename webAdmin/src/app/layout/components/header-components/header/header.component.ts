import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'prx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: { class: 'main-header' }
})
export class HeaderComponent implements OnInit {
  @HostBinding('class.fixed')
  @Input()
  fixed: boolean;

  constructor() {}

  ngOnInit() {}
}
