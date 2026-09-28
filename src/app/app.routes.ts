import { AppRoute } from './app-route.interface';
import { Dashboard } from './features/dashboard/dashboard';
import { CustomersList } from './features/customers/customers-list/customers-list';
import { AppUsersList } from './features/app-users/app-users-list/app-users-list';
import { CustomerForm } from './features/customers/customer-form/customer-form';
import { AppUserForm } from './features/app-users/app-user-form/app-user-form';

export const routes: AppRoute[] = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', title: 'Dashboard', component: Dashboard, showInMenu: true },

    // Customer module routes
    { path: 'customers', title: 'Customers', component: CustomersList, showInMenu: true },
    { path: 'customers/create', title: 'Create Customer', component: CustomerForm },
    { path: 'customers/:id/edit', title: 'Edit Customer', component: CustomerForm },

    // App Users module routes
    { path: 'app-users', title: 'App Users', component: AppUsersList, showInMenu: true },
    { path: 'app-users/create', title: 'Create App User', component: AppUserForm },
    { path: 'app-users/:id/edit', title: 'Edit App User', component: AppUserForm },

    // Wildcard route for a 404 page
    { path: '**', redirectTo: 'dashboard' },
];