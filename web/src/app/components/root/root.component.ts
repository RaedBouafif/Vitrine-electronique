import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent {
    headerLayout: 'classic'|'compact';

    constructor(
        public router: Router,
        public route: ActivatedRoute
    ) {
        this.route.data.subscribe(data => this.headerLayout = data.headerLayout);
    }
}
