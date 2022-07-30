import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prx-quick-sidenav-contacts',
  templateUrl: './quick-sidenav-contacts.component.html',
  styleUrls: ['./quick-sidenav-contacts.component.scss']
})
export class QuickSidenavContactsComponent implements OnInit {
  q: string = '';
  messages = [
    {
      time: '45 mins ago',
      message: 'lorem ipsum dolor sit amet consectetur adipiscing',
      from: {
        name: 'dianne lee',
        email: 'dianne.lee@example.com',
        status: 'offline',
        picture: 'https://randomuser.me/api/portraits/thumb/women/53.jpg'
      }
    },
    {
      time: '18 days ago',
      message: 'odio cras malesuada lacus luctus aliquet',
      from: {
        name: 'timmothy palmer',
        email: 'timmothy.palmer@example.com',
        status: 'away',
        picture: 'https://randomuser.me/api/portraits/thumb/men/44.jpg'
      }
    },
    {
      time: '37 mins ago',
      message: 'ac sollicitudin tincidunt quis odio in',
      from: {
        name: 'crystal woods',
        email: 'crystal.woods@example.com',
        status: 'online',
        picture: 'https://randomuser.me/api/portraits/thumb/women/18.jpg'
      }
    },
    {
      time: '53 days ago',
      message: 'maximus sociosqu vitae',
      from: {
        name: 'luciele da mota',
        email: 'luciele.damota@example.com',
        status: 'busy',
        picture: 'https://randomuser.me/api/portraits/thumb/women/21.jpg'
      }
    },
    {
      time: '21 days ago',
      message: 'sagittis neque imperdiet erat convallis dictumst class',
      from: {
        name: 'maya laurent',
        email: 'maya.laurent@example.com',
        status: 'offline',
        picture: 'https://randomuser.me/api/portraits/thumb/women/69.jpg'
      }
    }
  ];

  constructor() {}

  ngOnInit() {}
}
