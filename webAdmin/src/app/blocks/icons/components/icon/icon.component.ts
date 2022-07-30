import { Component, OnInit, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { BaseComponent } from '@app/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'prx-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent extends BaseComponent implements OnInit {
  @Input()
  icon: IconDefinition | string;

  @Input()
  size: SizeProp | 'md';

  get useFontAwesome(): boolean {
    return this.isFontAwesome(this.icon);
  }

  constructor() {
    super();
  }

  ngOnInit() {}

  isFontAwesome(icon: IconDefinition | string): icon is IconDefinition {
    return !!(icon as IconDefinition).prefix;
  }
}
