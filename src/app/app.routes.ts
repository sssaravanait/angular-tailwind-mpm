import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { Customers } from './features/customers/customers';
import { AppUsers } from './features/app-users/app-users';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', title: 'Dashboard', component: Dashboard },
    { path: 'customers', title: 'Customers', component: Customers },
    { path: 'app-users', title: 'App Users', component: AppUsers },
    { path: '**', redirectTo: 'dashboard' },
];