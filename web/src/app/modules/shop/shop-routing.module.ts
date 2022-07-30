import { NgModule } from '@angular/core';
import { Routes, RouterModule, Data, ResolveData } from '@angular/router';
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PageCartComponent } from './pages/page-cart/page-cart.component';
import { PageCheckoutComponent } from './pages/page-checkout/page-checkout.component';
import { CheckoutGuard } from './guards/checkout.guard';
import { PageProductComponent } from './pages/page-product/page-product.component';
import { ProductsListResolverService } from './resolvers/products-list-resolver.service';
import { CategoryResolverService } from './resolvers/category-resolver.service';
import { ProductResolverService } from './resolvers/product-resolver.service';
import { PageOrderSuccessComponent } from './pages/page-order-success/page-order-success.component';
import { CategoriesResolverService } from './resolvers/categories-resolver.service';
import { ProductsListDiscountResolverService } from './resolvers/products-list-discount-resolver.service';
import { PageDiscountComponent } from './pages/page-discount/page-discount.component';
import { AuthenticationGuard } from 'src/app/core/authentication/authentication.guard';

const categoryPageData: Data = {
    // Number of products per row. Possible values: 3, 4, 5.
    columns: 3,
    // Shop view mode by default. Possible values: 'grid', 'grid-with-features', 'list'.
    viewMode: 'grid',
    // Sidebar position. Possible values: 'start', 'end'.
    // It does not matter if the value of the 'columns' parameter is not 3.
    // For LTR scripts "start" is "left" and "end" is "right".
    sidebarPosition: 'start'
};

const categoryPageResolvers: ResolveData = {
    category: CategoryResolverService,
    categories:CategoriesResolverService,
    products: ProductsListResolverService
};

const routes: Routes = [
    {
        path: 'catalog',
        component: PageCategoryComponent,
        data: categoryPageData,
        resolve: categoryPageResolvers,
    },
    {
        path: 'catalog/discount',
        component: PageDiscountComponent,
        data: {
            columns: 5,
             viewMode: 'grid',
            sidebarPosition: 'start'
        },
        resolve: {
            products: ProductsListDiscountResolverService
        },
    },
    {
        path: 'catalog/:categorySlug',
        component: PageCategoryComponent,
        data: categoryPageData,
        resolve: categoryPageResolvers,
    },
    {
        path: 'catalog/:categorySlug/:subcategorySlug',
        component: PageCategoryComponent,
        data: categoryPageData,
        resolve: categoryPageResolvers,
    },
    {
        path: 'products/:productSlug',
        component: PageProductComponent,
        data: {
            // Product page layout. Possible values: 'standard', 'columnar', 'sidebar'.
            layout: 'standard',
            // Sidebar position. Possible values: 'start', 'end'.
            // It does not matter if the value of the 'layout' parameter is not 'sidebar'.
            // For LTR scripts "start" is "left" and "end" is "right".
            sidebarPosition: 'start'
        },
        resolve: {
            product: ProductResolverService
        },
    },
    {
        path: 'cart',
        pathMatch: 'full',
        component: PageCartComponent
    },
    {
        path: 'cart/checkout',
        component: PageCheckoutComponent,
        canActivate: [CheckoutGuard,AuthenticationGuard],
    },
    {
        path: 'cart/checkout/success/:order',
        component: PageOrderSuccessComponent,
        canActivate: [AuthenticationGuard],
    }


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule { }
