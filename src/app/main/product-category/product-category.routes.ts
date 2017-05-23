import { ProductCategoryComponent } from './product-category.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: ProductCategoryComponent }
];
export const ProductCategoryRouter = RouterModule.forChild(routes);