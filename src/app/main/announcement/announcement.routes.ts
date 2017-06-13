import { AnnouncementComponent } from './announcement.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: AnnouncementComponent}
];
export const AnnouncementRouter = RouterModule.forChild(routes);
