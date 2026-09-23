import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { CustomersList } from './features/customers/customers-list/customers-list';
import { AppUsersList } from './features/app-users/app-users-list/app-users-list';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', title: 'Dashboard', component: Dashboard },
    { path: 'customers', title: 'Customers', component: CustomersList },
    { path: 'app-users', title: 'App Users', component: AppUsersList },
    { path: '**', redirectTo: 'dashboard' },
];