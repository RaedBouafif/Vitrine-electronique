import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { AdministratorListComponent } from './administrator/administrator-list/administrator-list.component';
import { AdministratorNewComponent } from './administrator/administrator-new/administrator-new.component';
import { AdministratorEditComponent } from './administrator/administrator-edit/administrator-edit.component';
import { SettingsShellComponent } from './components/settings-shell/settings-shell.component';
import { SettingsAccountComponent } from './components/settings-account/settings-account.component';
import { SettingsLinksComponent } from './components/settings-links/settings-links.component';
import { SettingsPaymentComponent } from './components/settings-payment/settings-payment.component';
import { SettingsDeliveryComponent } from './components/settings-delivery/settings-delivery.component';
const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: '',
    component: SettingsShellComponent,
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      {
        path: 'account',
        component: SettingsAccountComponent,
        data: { title: extract('Description') }
      },
      {
        path: 'links',
        component: SettingsLinksComponent,
        data: { title: extract('Liens utils') }
      },
      {
        path: 'payment',
        component: SettingsPaymentComponent,
        data: { title: extract('Methode de paiement') }
      },
      {
        path: 'delivery',
        component: SettingsDeliveryComponent,
        data: { title: extract('Methode de livraison') }
      }
    ]
  },
  {
    path: 'admin',
    component: AdministratorListComponent,
    data: { title: extract('Liste Administrateur') }
  },
  {
    path: 'admin/new',
    component: AdministratorNewComponent,
    data: { title: extract('Nouveau Administrateur') }
  },
  {
    path: 'admin/edit/:id',
    component: AdministratorEditComponent,
    data: { title: extract('MAJ Administrateur') }
  },

  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
  static declarations = [
    AdministratorListComponent,
    AdministratorNewComponent,
    AdministratorEditComponent,
    SettingsAccountComponent,
    SettingsShellComponent,
    SettingsLinksComponent,
    SettingsDeliveryComponent,
    SettingsPaymentComponent
  ];
}
