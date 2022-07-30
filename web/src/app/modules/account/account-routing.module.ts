import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageOrdersListComponent } from './pages/page-orders-list/page-orders-list.component';
import { PageAddressesListComponent } from './pages/page-addresses-list/page-addresses-list.component';
import { PageProfileComponent } from './pages/page-profile/page-profile.component';
import { PagePasswordComponent } from './pages/page-password/page-password.component';
import { PageOrderDetailsComponent } from './pages/page-order-details/page-order-details.component';
import { PageEditAddressComponent } from './pages/page-edit-address/page-edit-address.component';
import { PageAccountConfirmationComponent } from './pages/page-account-confirmation/page-account-confirmation.component';
import { PageForgotPasswordComponent } from './pages/page-forgot-password/page-forgot-password.component';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthenticationGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                component: PageDashboardComponent
            },
            {
                path: 'profile',
                component: PageProfileComponent
            },
            {
                path: 'addresses',
                component: PageAddressesListComponent
            },
            {
                path: 'addresses/:addressId',
                component: PageEditAddressComponent
            },
            {
                path: 'orders',
                component: PageOrdersListComponent
            },
            {
                path: 'orders/:orderId',
                component: PageOrderDetailsComponent
            },
            {
                path: 'password',
                component: PagePasswordComponent
            }
        ]
    },
    {
        path: 'login',
        component: PageLoginComponent
    },
    {
        path: 'confirmation/:token/:mail',
        component: PageAccountConfirmationComponent
    },
    {
        path: 'forgot',
        component: PageForgotPasswordComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
