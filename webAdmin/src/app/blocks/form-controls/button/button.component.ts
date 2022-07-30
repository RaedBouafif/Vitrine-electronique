import { Component, OnInit, Input } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'prx-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() type: string;
  @Input() color: string;
  @Input() outlined: boolean;
  @Input() disabled: boolean;
  @Input() isLoading: boolean;
  @Input() icon: any;

  loadingIcon = faSpinner;

  constructor() {}

  ngOnInit() {}
}
