import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'prx-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit, AfterViewInit {
  @Input()
  title: string;

  @Input()
  pre: string;

  @Input()
  sub: string;

  @Input()
  hasNavigation: boolean;

  @ViewChild('toolsView', { static: false })
  toolsView: ElementRef;

  toolsHidden: boolean;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.toolsHidden = this.toolsView.nativeElement.children.length === 0;
    this.cdRef.detectChanges();
  }
}
