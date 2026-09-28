import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LabelModule } from 'primeng/label';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';

import { Customer } from '../customer.interface';

export interface Genders {
    label: string;
    value: string;
}

export interface Cities {
    id: number;
    label: string;
}

@Component({
    imports: [
        FormsModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        LabelModule,
        DatePickerModule,
        SelectModule,
        InputMaskModule,
    ],
    selector: 'app-customer-form',
    styleUrl: './customer-form.css',
    templateUrl: './customer-form.html',
})
export class CustomerForm {
    customer: Customer = {
        id: 0,
        title: null,
        education: null,
        name: null,
        surname: null,
        birth_date: new Date(),
        gender: null,
        city: null,
        phone: null,
        email: null,
        is_active: false,
        source: null,
        device: null,
        created_at: null,
        updated_at: null,
    };

    readonly genders: Genders[] = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
    ];

    readonly cities: Cities[] = [
        { id: 1, label: 'Mafia Village' },
        { id: 2, label: 'Jibondo Island Village' },
        { id: 3, label: 'Konde Village' },
        { id: 4, label: 'Wette Village' },
        { id: 5, label: 'Tumbe Village' },
    ];
}
