import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'prx-quick-sidenav',
  templateUrl: './quick-sidenav.component.html',
  styleUrls: ['./quick-sidenav.component.scss']
})
export class QuickSidenavComponent implements OnInit {
  @HostBinding('class.collapsed')
  @Input()
  collapsed: boolean;

  constructor() {}

  ngOnInit() {}
}
