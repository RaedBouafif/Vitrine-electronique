import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { GalleryListComponent } from './gallery/gallery-list/gallery-list.component';
import { GalleryNewComponent } from './gallery/gallery-new/gallery-new.component';
import { AdCategoriesListComponent } from './adCategories/ad-categories-list/ad-categories-list.component';
import { AdCategoriesNewComponent } from './adCategories/ad-categories-new/ad-categories-new.component';
import { AdCategoriesEditComponent } from './adCategories/ad-categories-edit/ad-categories-edit.component';
import { AdListComponent } from './ad/ad-list/ad-list.component';
import { BannerListComponent } from './banner/banner-list/banner-list.component';
import { BannerNewComponent } from './banner/banner-new/banner-new.component';
import { BannerEditComponent } from './banner/banner-edit/banner-edit.component';
const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'gallery',
    component: GalleryListComponent,
    data: { title: extract('Gallery') }
  },
  {
    path: 'gallery/new',
    component: GalleryNewComponent,
    data: { title: extract('Nouveau Image') }
  },
  {
    path: 'ad/categories',
    component: AdCategoriesListComponent,
    data: { title: extract('Liste categories annonces') }
  },
  {
    path: 'ad/new-category',
    component: AdCategoriesNewComponent,
    data: { title: extract('Nouvelle  categorie annonces') }
  },
  {
    path: 'ad/edit-category/:id',
    component: AdCategoriesEditComponent,
    data: { title: extract('MAJ  categorie annonces') }
  },
  {
    path: 'ad',
    component: AdListComponent,
    data: { title: extract('Liste  annonces') }
  },
  {
    path: 'banner',
    component: BannerListComponent,
    data: { title: extract('Liste bannières') }
  },
  {
    path: 'banner/new',
    component: BannerNewComponent,
    data: { title: extract('Nouvelle bannière') }
  },
  {
    path: 'banner/edit/:id',
    component: BannerEditComponent,
    data: { title: extract('MAJ  bannière') }
  },
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OthersRoutingModule {
  static declarations = [
    GalleryListComponent,
    GalleryNewComponent,
    AdCategoriesListComponent,
    AdCategoriesNewComponent,
    AdCategoriesEditComponent,
    AdListComponent,
    BannerListComponent,
    BannerEditComponent,
    BannerNewComponent
  ];
}
