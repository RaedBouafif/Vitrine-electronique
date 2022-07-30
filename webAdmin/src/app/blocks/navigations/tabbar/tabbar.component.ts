import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'prx-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss']
})
export class TabbarComponent implements OnInit {
  config: PerfectScrollbarConfigInterface = {
    suppressScrollY: true
  };

  constructor() {}

  ngOnInit() {}
}
