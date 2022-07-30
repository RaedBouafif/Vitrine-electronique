import { Component, Input } from '@angular/core';
import { DirectionService } from '../../../shared/services/direction.service';

@Component({
    selector: 'app-block-posts',
    templateUrl: './block-posts.component.html',
    styleUrls: ['./block-posts.component.scss']
})
export class BlockPostsComponent {
    @Input() header = '';
    @Input() layout: 'list-sm'|'grid-nl' = 'list-sm';
    @Input() posts: any[] = [];

    carouselDefaultOptions = {
        margin: 30,
        nav: false,
        dots: false,
        loop: true,
        rtl: this.direction.isRTL()
    };

    carouselOptionsByLayout = {
        'grid-nl': {
            responsive: {
                930: {items: 3},
                690: {items: 2},
                0: {items: 1}
            }
        },
        'list-sm': {
            responsive: {
                930: {items: 2},
                0: {items: 1}
            }
        }
    };

    get carouselOptions(): any {
        return Object.assign({}, this.carouselDefaultOptions, this.carouselOptionsByLayout[this.layout]);
    }

    constructor(
        private direction: DirectionService
    ) { }
}
