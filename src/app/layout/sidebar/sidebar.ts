import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { routes } from '../../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    styleUrls: ['./sidebar.css'],
    templateUrl: './sidebar.html',
    imports: [RouterLink, RouterLinkActive, NgFor],
})
export class Sidebar {
    menuItems = routes.filter(route => route.path && route.path != '**' && route.path != '');
}
