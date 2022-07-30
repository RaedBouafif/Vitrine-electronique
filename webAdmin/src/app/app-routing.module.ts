import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'home',
      loadChildren: () =>
        import('./content/start/start.module').then(m => m.StartModule)
    },
    {
      path: 'contacts',
      loadChildren: () =>
        import('./content/contacts/contacts.module').then(m => m.ContactsModule)
    },
    {
      path: 'settings',
      loadChildren: () =>
        import('./content/settings/settings.module').then(m => m.SettingsModule)
    },
    {
      path: 'inbox',
      loadChildren: () =>
        import('./content/inbox/inbox.module').then(m => m.InboxModule)
    },
    {
      path: 'others',
      loadChildren: () =>
        import('./content/others/others.module').then(m => m.OthersModule)
    },
    {
      path: 'article',
      loadChildren: () =>
        import('./content/article/article.module').then(m => m.ArticleModule)
    },
    {
      path: 'orders',
      loadChildren: () =>
        import('./content/billing/billing.module').then(m => m.BillingModule)
    }
  ]),

  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
