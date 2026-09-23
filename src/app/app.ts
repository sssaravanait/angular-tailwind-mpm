import { Component, signal } from '@angular/core';
import { Layout } from './layout/layout/layout';

@Component({
    imports: [Layout],
    selector: 'app-root',
    styleUrl: './app.css',
    template: `<app-layout></app-layout>`,
})
export class App {
    protected readonly title = signal('angular-tailwind-mpm');
}
