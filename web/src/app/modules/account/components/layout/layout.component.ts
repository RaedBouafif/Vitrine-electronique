import { Component } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.sass']
})
export class LayoutComponent {
    links: {label: string; url: string}[] = [
        {label: 'Tableau de bord', url: './dashboard'},
        {label: 'Editer le profile', url: './profile'},
        {label: 'Historique commandes', url: './orders'},
        {label: 'Carnet des adresses', url: './addresses'},
        {label: 'Mot de passe', url: './password'}
    ];

    constructor() { }
}
