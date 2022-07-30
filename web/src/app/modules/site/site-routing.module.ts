import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAboutUsComponent } from './pages/page-about-us/page-about-us.component';
import { PageContactUsComponent } from './pages/page-contact-us/page-contact-us.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'about-us'
    },
    {
        path: 'about-us',
        component: PageAboutUsComponent
    },
    {
        path: 'contact-us',
        component: PageContactUsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SiteRoutingModule { }
