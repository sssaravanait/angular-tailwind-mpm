import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, DestroyRef, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog, DialogModule } from 'primeng/dialog';
import { LabelModule } from 'primeng/label';
import { ButtonModule } from 'primeng/button';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { Spinner } from '@primeicons/angular/spinner';

import { environment } from '@env/environment';
import { CustomerForm } from '../customer-form/customer-form';
import { Customer } from '@shared/common.interfaces';

interface CustomersResponse {
    current_page: number;
    data: Customer[];
    filters: Object;
    first_page_url: string | null;
    from: number | null;
    last_page: number;
    last_page_url: string | null;
    links: [] | null;
    next_page_url: string | null;
    path: string | null;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

@Component({
    imports: [
        TableModule, 
        InputTextModule, 
        IconFieldModule,
        Spinner, 
        CommonModule,
        DialogModule, 
        Dialog,
        ButtonModule, 
        InputTextModule, 
        LabelModule, 
        FormsModule,
        CustomerForm,
        RouterLink,
    ],
    selector: 'app-customers-list',
    styleUrls: ['./customers-list.css'],
    templateUrl: './customers-list.html',
})
export class CustomersList implements OnInit {
    private readonly http = inject(HttpClient);
    private readonly destroyRef = inject(DestroyRef);
    private readonly apiUrl = `${environment.apiUrl}api/people`;

    readonly pageTitle = 'Customers List';
    customers = signal<Customer[]>([]);
    loading = signal(false);
    error = signal('');
    totalRecords = signal(0); // Holds the total number of records from the backend
    first = signal(0); // Offset for lazy loading

    // Initial sort field and order for PrimeNG table (if needed, otherwise can be removed)
    // Assuming 'name' ascending as default
    initialSortField = signal('created_at');
    initialSortOrder = signal(-1); // 1 for ascending, -1 for descending

    showCreateCustomerModal = signal<boolean>(false);

    ngOnInit(): void {
        // No initial loadCustomers call here, as onLazyLoad will handle the first fetch
    }

    // This method will be called by PrimeNG's onLazyLoad event
    loadCustomersLazy(event: TableLazyLoadEvent): void {
        this.loading.set(true);
        this.error.set('');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${environment.apiToken}`,
            Accept: 'application/json',
        });

        // Determine current page from first and rows
        const page = event.first! / event.rows! + 1; // Calculate page number
        const per_page = event.rows!; // Page size

        let params = new HttpParams()
            .set('page', page.toString())
            .set('per_page', per_page.toString());

        // Add sorting parameters if available
        if (event.sortField) {
            let sortBy = (event.sortField!.toString());
            sortBy = (event.sortOrder === 1) ? sortBy : '-'+sortBy;
            params = params.set('sort_by', sortBy);
        }

        // Add global filter parameter if available
        if (event.globalFilter) {
            params = params.set('search', event.globalFilter.toString());
        }

        this.http.get<CustomersResponse>(this.apiUrl, { headers, params }).pipe(
            takeUntilDestroyed(this.destroyRef), // Use takeUntilDestroyed for the http observable
            finalize(() => this.loading.set(false)),
        ).subscribe({
            next: (response) => {
                this.customers.set(response.data);
                this.totalRecords.set(response.total); // Update total records
                this.first.set(event.first!); // Keep track of the current offset
            },
            error: () => {
                this.customers.set([]);
                this.error.set('Unable to load customers. Please try again.');
                this.totalRecords.set(0); // Reset total records on error
            },
        });
    }

    // This method is for retrying after an error, can call loadCustomersLazy with current state
    retryLoadCustomers(): void {
        // Assuming we want to retry loading the current page/state
        // We'll need a way to store the last lazy load event or reconstruct it.
        // For simplicity, let's just trigger a fresh load which will likely default to page 1.
        // In a more complex app, you might store the last event state.
        this.loadCustomersLazy({
            first: this.first(),
            rows: 10, // Assuming a default page size if not explicitly tracking last event
            sortField: this.initialSortField(),
            sortOrder: this.initialSortOrder(),
            filters: undefined, // No filters on retry unless explicitly managed
            globalFilter: null
        });
    }
}