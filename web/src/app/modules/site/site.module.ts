import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';

// modules
import { BlocksModule } from '../blocks/blocks.module';
import { SharedModule } from '../../shared/shared.module';
import { SiteRoutingModule } from './site-routing.module';

// pages
import { PageAboutUsComponent } from './pages/page-about-us/page-about-us.component';
import { PageContactUsComponent } from './pages/page-contact-us/page-contact-us.component';


@NgModule({
    declarations: [
        // pages
        PageAboutUsComponent,
        PageContactUsComponent
     
    ],
    imports: [
        // modules (angular)
        CommonModule,
        FormsModule,
        // modules (third-party)
        CarouselModule,
        // modules
        BlocksModule,
        SharedModule,
        SiteRoutingModule
    ]
})
export class SiteModule { }
