import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '@app/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'prx-dropdown-icon',
  templateUrl: './dropdown-icon.component.html',
  styleUrls: ['./dropdown-icon.component.scss']
})
export class DropdownIconComponent extends BaseComponent implements OnInit {
  @Input()
  open: boolean;

  angleDown = faAngleDown;

  constructor() {
    super();
  }

  ngOnInit() {}
}
