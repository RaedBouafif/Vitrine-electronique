import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'prx-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnChanges {
  // Indicates if the component shows the loading bars
  @Input() isLoading = true;

  // Which template to use
  @Input() template: string;

  // Total number of bars-groups to use
  @Input() count: number = 5;

  // The message to show when there no items
  @Input() emptyMessage: string;

  // URL for when there no items on the collection
  @Input() emptyUrl: string;

  // Private internal, used to actually iterate over the bars
  private items: number[];

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.items = Array(this.count).fill(0);
  }
}
