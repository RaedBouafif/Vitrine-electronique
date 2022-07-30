import { Component, Input } from '@angular/core';
import { DirectionService } from '../../../shared/services/direction.service';
import { RootService } from '../../../shared/services/root.service';
import { Brand } from '../../../shared/interfaces/brand';

@Component({
    selector: 'app-block-brands',
    templateUrl: './block-brands.component.html',
    styleUrls: ['./block-brands.component.scss']
})
export class BlockBrandsComponent {
    @Input() brands: Brand[] = [];

    carouselOptions = {
        items: 6,
        nav: false,
        dots: false,
        loop: true,
        responsive: {
            1100: {items: 6},
            920: {items: 5},
            680: {items: 4},
            500: {items: 3},
            0: {items: 2}
        },
        rtl: this.direction.isRTL()
    };

    constructor(
        public root: RootService,
        private direction: DirectionService
    ) { }
}
