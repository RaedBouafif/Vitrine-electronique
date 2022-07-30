import { Component, OnInit } from '@angular/core';
import { ColorScheme } from '@app/core';
import { TimeLineModel } from '@app/blocks/timelines/models/timeline';

@Component({
  selector: 'prx-quick-sidenav-tasks',
  templateUrl: './quick-sidenav-tasks.component.html',
  styleUrls: ['./quick-sidenav-tasks.component.scss']
})
export class QuickSidenavTasksComponent implements OnInit {
  tasks: TimeLineModel[] = [
    {
      id: 1,
      title: 'Breakfast with Jane',
      description: 'Let her know how important is her work to us',
      priority: ColorScheme.Primary,
      time: { hour: 7, minutes: 45, period: 'am' },
      done: true
    },
    {
      id: 2,
      title: 'Verify Mr. Doe proposal',
      description: 'Take important decision based pm results',
      priority: ColorScheme.Info,
      time: { hour: 9, minutes: 0, period: 'am' }
    },
    {
      id: 3,
      title: 'Get budget approved',
      description: 'Let the team know next steps',
      priority: ColorScheme.Danger,
      time: { hour: 10, minutes: 45, period: 'am' }
    },
    {
      id: 4,
      title: 'Review website updates',
      description: 'Create new project wireframes for next weed presentation',
      priority: ColorScheme.Alternate,
      time: { hour: 1, minutes: 30, period: 'pm' }
    },
    {
      id: 5,
      title: 'Schedule meeting with marketing team',
      description: 'Our new product needs to reach 1M people',
      priority: ColorScheme.Dark,
      time: { hour: 2, minutes: 0, period: 'pm' }
    },
    {
      id: 6,
      title: 'Write Proxima documentation',
      description: 'Include a video series from the beginning',
      priority: ColorScheme.Primary,
      time: { hour: 3, minutes: 45, period: 'pm' }
    }
  ];

  constructor() {}

  ngOnInit() {}
}
