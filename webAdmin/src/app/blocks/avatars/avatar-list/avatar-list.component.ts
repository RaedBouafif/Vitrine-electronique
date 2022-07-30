import { Component, OnInit } from '@angular/core';
import { AvatarList } from '../base/avatar-list';

@Component({
  selector: 'prx-avatar-list',
  templateUrl: './avatar-list.component.html',
  styleUrls: ['./avatar-list.component.scss']
})
export class AvatarListComponent extends AvatarList implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
