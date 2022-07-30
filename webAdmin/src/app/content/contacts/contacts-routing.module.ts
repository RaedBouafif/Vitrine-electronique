import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { ProviderListComponent } from './provider/provider-list/provider-list.component';
import { ProviderNewComponent } from './provider/provider-new/provider-new.component';
import { ProviderEditComponent } from './provider/provider-edit/provider-edit.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'customer',
    component: CustomerListComponent,
    data: { title: extract('Liste Clients') }
  },
  {
    path: 'provider',
    component: ProviderListComponent,
    data: { title: extract('Liste Fournisseurs') }
  },
  {
    path: 'provider/new',
    component: ProviderNewComponent,
    data: { title: extract('Nouveau Fournisseur') }
  },
  {
    path: 'provider/edit/:id',
    component: ProviderEditComponent,
    data: { title: extract('Mettre a jour Fournisseur') }
  },
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule {
  static declarations = [
    ProviderListComponent,
    ProviderNewComponent,
    ProviderEditComponent,
    CustomerListComponent
  ];
}
