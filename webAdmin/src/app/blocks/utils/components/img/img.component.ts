import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'prx-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {
  @Input()
  image: string;

  @Input()
  responsive: boolean = true;

  @Input()
  isMockup: boolean = false;

  @Input()
  imgClass: string;

  constructor() {}

  ngOnInit() {}
}
