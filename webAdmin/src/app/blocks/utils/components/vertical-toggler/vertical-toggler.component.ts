import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from '@app/core';

@Component({
  selector: 'prx-vertical-toggler',
  templateUrl: './vertical-toggler.component.html',
  styleUrls: ['./vertical-toggler.component.scss']
})
export class VerticalTogglerComponent extends BaseComponent implements OnInit {
  angleDown = faChevronDown;

  @HostBinding('class.toggled')
  @Input()
  toggled: boolean;

  constructor() {
    super('vertical-toggler');
  }

  ngOnInit() {}
}
