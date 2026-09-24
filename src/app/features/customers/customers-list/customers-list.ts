import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
}
@Component({
    imports: [TableModule, InputTextModule, IconFieldModule, ButtonModule],
    selector: 'app-customers-list',
    styleUrls: ['./customers-list.css'],
    templateUrl: './customers-list.html',
})
export class CustomersList {
    pageTitle: string =  'Customers List';
    readonly customers: Customer[] = [
        { id: 1, name: 'Aarav Sharma', email: 'aarav.sharma@example.com', phone: '+91 98765 43210' },
        { id: 2, name: 'Priya Nair', email: 'priya.nair@example.com', phone: '+91 98220 11223' },
        { id: 3, name: 'Rohan Mehta', email: 'rohan.mehta@example.com', phone: '+91 90045 33455' },
        { id: 4, name: 'Sneha Iyer', email: 'sneha.iyer@example.com', phone: '+91 91234 55667' },
        { id: 5, name: 'Vikram Singh', email: 'vikram.singh@example.com', phone: '+91 98111 77889' },
        { id: 6, name: 'Ananya Rao', email: 'ananya.rao@example.com', phone: '+91 99887 66554' },
        { id: 7, name: 'Karthik Kumar', email: 'karthik.kumar@example.com', phone: '+91 90342 22110' },
        { id: 8, name: 'Meera Pillai', email: 'meera.pillai@example.com', phone: '+91 97654 12398' },
        { id: 9, name: 'Arjun Desai', email: 'arjun.desai@example.com', phone: '+91 98450 98761' },
        { id: 10, name: 'Divya Menon', email: 'divya.menon@example.com', phone: '+91 96500 45672' },
        { id: 11, name: 'Nikhil Joshi', email: 'nikhil.joshi@example.com', phone: '+91 99223 34001' },
        { id: 12, name: 'Riya Kapoor', email: 'riya.kapoor@example.com', phone: '+91 98989 21212' },
        { id: 13, name: 'Sanjay Reddy', email: 'sanjay.reddy@example.com', phone: '+91 97010 66778' },
        { id: 14, name: 'Pooja Bhatt', email: 'pooja.bhatt@example.com', phone: '+91 91789 33440' },
        { id: 15, name: 'Aditya Verma', email: 'aditya.verma@example.com', phone: '+91 98657 81234' },
        { id: 16, name: 'Kavya Krishna', email: 'kavya.krishna@example.com', phone: '+91 90909 12121' },
        { id: 17, name: 'Rahul Bose', email: 'rahul.bose@example.com', phone: '+91 98300 55566' },
        { id: 18, name: 'Ishita Das', email: 'ishita.das@example.com', phone: '+91 97555 80808' },
        { id: 19, name: 'Manav Shah', email: 'manav.shah@example.com', phone: '+91 99999 11111' },
        { id: 20, name: 'Tanvi Gupta', email: 'tanvi.gupta@example.com', phone: '+91 93333 22222' },
    ];
}
