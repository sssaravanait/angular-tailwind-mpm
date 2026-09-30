import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Customer } from '@shared/common.interfaces';

@Injectable({ providedIn: 'root' })
export class CustomerService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl.replace(/\/$/, '')}/api/people`;

    private getHeaders() {
        return new HttpHeaders({
            Authorization: `Bearer ${environment.apiToken}`,
            Accept: 'application/json',
        });
    }

    /**
     * Create a new customer
     */
    createCustomer(customer: Partial<Customer>): Observable<Customer> {
        // DRY: Centralized headers and URL logic
        return this.http.post<Customer>(this.apiUrl, customer, {
            headers: this.getHeaders(),
        });
    }

    /**
     * Get a single customer by ID
     * Path: /api/people/{id}
     */
    getCustomer(id: number): Observable<Customer> {
        return this.http.get<Customer>(`${this.apiUrl}/${id}`, {
            headers: this.getHeaders(),
        });
    }
}
