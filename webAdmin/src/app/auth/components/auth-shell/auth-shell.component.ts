import { Component, OnInit } from '@angular/core';
import {
  faFacebook,
  faGoogle,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'prx-auth-shell',
  templateUrl: './auth-shell.component.html',
  styleUrls: ['./auth-shell.component.scss']
})
export class AuthShellComponent implements OnInit {
  error: string;

  fa = {
    facebook: faFacebook,
    google: faGoogle,
    linkedin: faLinkedinIn
  };

  constructor() {}

  ngOnInit() {}
}
