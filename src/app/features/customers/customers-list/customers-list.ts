import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, DestroyRef, inject, signal, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { environment } from '../../../../environments/environment';
import { Spinner } from '@primeicons/angular/spinner';

export interface Customer {
    id: number;
    title: string | null;
    education: string | null;
    name: string | null;
    surname: string | null;
    birth_date: string | null;
    city: string | null;
    phone: string | null;
    email: string | null;
    is_active: boolean;
    source: string | null;
    device: string | null;
    created_at: string | null;
    updated_at: string | null;
}

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
    imports: [TableModule, InputTextModule, IconFieldModule, ButtonModule, Spinner],
    selector: 'app-customers-list',
    styleUrls: ['./customers-list.css'],
    templateUrl: './customers-list.html',
})
export class CustomersList implements OnInit { // Implement OnInit
    private readonly http = inject(HttpClient);
    private readonly destroyRef = inject(DestroyRef); // Keep destroyRef if you plan to use takeUntilDestroyed for other observables
    private readonly apiUrl = `${environment.apiUrl.replace(/\/$/, '')}/api/people`;

    readonly pageTitle = 'Customers List'; // This can stay as a readonly property
    customers = signal<Customer[]>([]);
    loading = signal(false);
    error = signal('');
    currentPage = signal(1);
    lastPage = signal(1);
    totalCustomers = signal(0);
    initialSortField = signal('created_at');
    initialSortOrder = signal(-1);
    private readonly pageSize = 10; // Keep as private readonly

    ngOnInit(): void {
        this.loadCustomers();
    }

    loadCustomers(page: number = 1): void {
        this.loading.set(true);
        this.error.set('');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${environment.apiToken}`,
            Accept: 'application/json',
        });

        // Use HttpParams for cleaner URL parameter handling
        const params = new HttpParams()
            .set('per_page', this.pageSize.toString())
            .set('page', page.toString());

        this.http.get<CustomersResponse>(this.apiUrl, { headers, params }).pipe(
            // takeUntilDestroyed(this.destroyRef), // Optional for HTTP requests that update signals directly
            finalize(() => this.loading.set(false)), // Ensure loading is set to false even on error
        ).subscribe({
            next: (response) => {
                this.customers.set(response.data);
                this.currentPage.set(response.current_page);
                this.lastPage.set(response.last_page);
                this.totalCustomers.set(response.total);
            },
            error: () => {
                this.customers.set([]);
                this.error.set('Unable to load customers. Please try again.');
            },
        });
    }

    previousPage(): void {
        if (this.currentPage() > 1) {
            this.loadCustomers(this.currentPage() - 1);
        }
    }

    nextPage(): void {
        if (this.currentPage() < this.lastPage()) {
            this.loadCustomers(this.currentPage() + 1);
        }
    }

    // If you need a method to go to a specific page like in the original code:
    goToPage(page: number): void {
        if (page >= 1 && page <= this.lastPage() && page !== this.currentPage() && !this.loading()) {
            this.loadCustomers(page);
        }
    }
}