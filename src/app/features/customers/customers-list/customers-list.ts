import { Component } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
@Component({
    imports: [AutoCompleteModule],
    selector: 'app-customers-list',
    styleUrl: './customers-list.css',
    // templateUrl: './customers-list.html',
    template: `<p-autocomplete />`,
})
export class CustomersList {}
