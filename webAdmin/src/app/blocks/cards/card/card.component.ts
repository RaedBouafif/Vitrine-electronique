import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '@app/core';

@Component({
  selector: 'prx-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent extends BaseComponent implements OnInit {
  @Input()
  title: string;

  constructor() {
    super('card');
  }

  ngOnInit(): void {}
}
