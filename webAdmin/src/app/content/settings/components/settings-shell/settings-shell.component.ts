import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prx-settings-shell',
  templateUrl: './settings-shell.component.html',
  styleUrls: ['./settings-shell.component.scss']
})
export class SettingsShellComponent implements OnInit {
  navigation = [
    { path: 'account', name: 'Description', icon: 'feather' },
    { path: 'links', name: 'Liens utils', icon: 'grid' },
    { path: 'payment', name: 'Methode de Paiment', icon: 'credit-card' },
    { path: 'delivery', name: 'Methode de Livraison', icon: 'shield' }
  ];

  constructor() {}

  ngOnInit() {}
}
