import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';

@Component({
    imports: [RouterOutlet, Sidebar, Header],
    selector: 'app-layout',
    styleUrl: './layout.css',
    templateUrl: './layout.html',
})
export class Layout {}
