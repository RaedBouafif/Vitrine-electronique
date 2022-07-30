import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { InvoiceComponent } from './components/invoice/invoice.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { BillingComponent } from './components/billing/billing.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: '',
    component: BillingComponent,
    children: [
      {
        path: '',
        component: InvoiceListComponent,
        data: { title: extract('Commandes') }
      }
    ]
  },
  {
    path: 'invoice/:id',
    component: InvoiceComponent,
    data: { title: extract('Commande') }
  },

  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule {
  static declarations = [
    BillingComponent,
    InvoiceComponent,
    InvoiceListComponent
  ];
}
