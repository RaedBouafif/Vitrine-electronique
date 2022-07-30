import { NgModule } from '@angular/core';
import { extract } from '@app/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesNewComponent } from './categories/categories-new/categories-new.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
//import { CategoriesDetailsComponent } from './categories/categories-details/categories-details.component';
import { ArticlesListComponent } from './articles/articles-list/articles-list.component';
import { ArticlesNewComponent } from './articles/articles-new/articles-new.component';
import { ArticlesEditComponent } from './articles/articles-edit/articles-edit.component';
//import { ArticlesDetailsComponent } from './articles/articles-details/articles-details.component';
const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: ArticlesListComponent,
    data: { title: extract('Liste Articles') }
  },
  {
    path: 'new',
    component: ArticlesNewComponent,
    data: { title: extract('Nouveau Article') }
  },
  /*   {
    path: 'details/:id',
    component: ArticlesDetailsComponent,
    data: { title: extract('Article') }
  }, */
  {
    path: 'edit/:id',
    component: ArticlesEditComponent,
    data: { title: extract('MAJ Article') }
  },
  {
    path: 'category',
    component: CategoriesListComponent,
    data: { title: extract('Liste Categories') }
  },
  {
    path: 'category/new',
    component: CategoriesNewComponent,
    data: { title: extract('Nouveau Categorie') }
  },
  /*   {
    path: 'category/:id',
    component: CategoriesDetailsComponent,
    data: { title: extract('Categorie') }
  }, */
  {
    path: 'category/edit/:id',
    component: CategoriesEditComponent,
    data: { title: extract('MAJ Categorie') }
  },

  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {
  static declarations = [
    CategoriesListComponent,
    CategoriesNewComponent,
    CategoriesEditComponent,
    //  CategoriesDetailsComponent,
    ArticlesListComponent,
    ArticlesNewComponent,
    ArticlesEditComponent
    // ArticlesDetailsComponent
  ];
}
