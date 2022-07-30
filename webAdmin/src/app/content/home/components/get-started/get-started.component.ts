import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prx-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit {
  tasks = [
    {
      title: 'Components',
      route: '/components',
      image: 'start-1.svg'
    },
    {
      title: 'Authentication',
      route: '/authentication',
      image: 'start-2.svg'
    },
    {
      title: 'Apps',
      route: '/dashboard',
      image: 'start-3.svg'
    },
    {
      title: 'Dashboard',
      route: '/dashboard',
      image: 'start-3.svg'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
