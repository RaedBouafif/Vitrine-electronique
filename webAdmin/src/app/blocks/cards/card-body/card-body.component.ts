import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/core';

@Component({
  selector: 'prx-card-body',
  templateUrl: './card-body.component.html',
  styleUrls: ['./card-body.component.scss']
})
export class CardBodyComponent extends BaseComponent implements OnInit {
  constructor() {
    super('card-body');
  }

  ngOnInit(): void {}
}
