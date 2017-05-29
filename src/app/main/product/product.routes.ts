import { ProductComponent } from './product.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: ProductComponent }
];
export const ProductRouter = RouterModule.forChild(routes);