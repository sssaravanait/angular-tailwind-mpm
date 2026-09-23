import { Route } from '@angular/router';

export interface AppRoute extends Route {
    showInMenu?: boolean; // Custom flag to indicate sidebar visibility
}