import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/core';

@Component({
  selector: 'prx-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss']
})
export class CardFooterComponent extends BaseComponent implements OnInit {
  constructor() {
    super('card-footer');
  }

  ngOnInit(): void {}
}
