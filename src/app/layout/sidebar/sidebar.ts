import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from '../../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    styleUrls: ['./sidebar.css'],
    templateUrl: './sidebar.html',
    imports: [RouterLink, RouterLinkActive, CommonModule],
})
export class Sidebar {
    menuItems = routes.filter(route => route.showInMenu );
}
