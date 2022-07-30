import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { faHome, IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface BreadcrumType {
  label: string;
  url?: string | string[];
}

@Component({
  selector: 'prx-breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.scss']
})
export class BreadcrumComponent implements OnInit {
  home = faHome;

  @Input()
  items: BreadcrumType[];

  @Input()
  separator: IconDefinition | string;

  constructor() {}

  ngOnInit() {}
}
