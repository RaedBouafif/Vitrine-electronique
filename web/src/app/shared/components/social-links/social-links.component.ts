import { Component, HostBinding, Input } from '@angular/core';

export interface SocialLinksItem {
    type: string;
    url: string;
    icon: string;
}

export type SocialLinksShape = 'circle' | 'rounded';

@Component({
    selector: 'app-social-links',
    templateUrl: './social-links.component.html',
    styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent {
   

    items: SocialLinksItem[] = [
        {type: 'facebook', url: '', icon: 'fab fa-facebook-f'},
        {type: 'twitter', url: '', icon: 'fab fa-twitter'},
        {type: 'youtube', url: '', icon: 'fab fa-youtube'},
        {type: 'instagram', url: '', icon: 'fab fa-instagram'},
        {type: 'rss', url: '', icon: 'fas fa-rss'},
    ];

    @Input() shape: SocialLinksShape;

    @HostBinding('class.social-links') classSocialLinks = true;

    @HostBinding('class.social-links--shape--circle') get classSocialLinksShapeCircle(): boolean { return this.shape === 'circle'; }

    @HostBinding('class.social-links--shape--rounded') get classSocialLinksShapeRounded(): boolean { return this.shape === 'rounded'; }

    constructor() { }
}
