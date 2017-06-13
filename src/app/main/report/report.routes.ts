import { RevenueComponent } from './revenue/revenue.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: RevenueComponent },
    { path: 'revenue', component: RevenueComponent }
];
export const ReportRouter = RouterModule.forChild(routes);