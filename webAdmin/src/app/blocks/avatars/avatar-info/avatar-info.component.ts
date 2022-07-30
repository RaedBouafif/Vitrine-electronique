import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'prx-avatar-info',
  templateUrl: './avatar-info.component.html',
  styleUrls: ['./avatar-info.component.scss']
})
export class AvatarInfoComponent implements OnInit {
  @Input()
  name: string;

  @Input()
  info: string;

  constructor() {}

  ngOnInit(): void {}
}
