import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimeLineModel } from '../models/timeline';

@Component({
  selector: 'prx-vertical-timeline-basic',
  templateUrl: './vertical-timeline-basic.component.html',
  styleUrls: ['./vertical-timeline-basic.component.scss']
})
export class VerticalTimelineBasicComponent implements OnInit {
  @Input()
  items: TimeLineModel[];

  @Input()
  indicator: 'solid' | 'outlined' = 'outlined';

  @Input()
  editable: boolean = false;

  @Output()
  taskChanged: EventEmitter<TimeLineModel> = new EventEmitter<TimeLineModel>();

  constructor() {}

  ngOnInit() {}

  onCheckChanged(checked: boolean, task: TimeLineModel) {
    task.done = checked;

    this.taskChanged.emit(task);
  }
}
