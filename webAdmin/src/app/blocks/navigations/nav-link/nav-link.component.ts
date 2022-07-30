import {
  Component,
  OnInit,
  ElementRef,
  Input,
  HostBinding
} from '@angular/core';
import { BaseComponent } from '@app/core';

@Component({
  selector: 'prx-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss']
})
export class NavLinkComponent extends BaseComponent implements OnInit {
  @HostBinding('class.disabled')
  @Input()
  disabled: boolean;

  constructor() {
    super('nav-link');
  }

  ngOnInit() {}
}
