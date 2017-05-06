import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    //localhost:4200
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    //localhost:4200/login
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
     //localhost:4200/main
    { path: 'main', loadChildren: './main/main.module#MainModule' }
]