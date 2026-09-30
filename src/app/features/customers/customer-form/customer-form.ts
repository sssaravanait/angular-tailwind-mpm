import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// PrimeNG Modules
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LabelModule } from 'primeng/label';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';

import { environment } from '@env/environment';
import { Customer, Gender, City } from '@shared/common.interfaces';
import { genders, cities } from '@shared/common.constants';
import { CustomerService } from '@services/customer.service';

@Component({
    imports: [
        CardModule,
        ButtonModule,
        InputTextModule,
        LabelModule,
        DatePickerModule,
        SelectModule,
        InputMaskModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    selector: 'app-customer-form',
    styleUrl: './customer-form.css',
    templateUrl: './customer-form.html',
})
export class CustomerForm {
    private fb = inject(FormBuilder);
    private readonly http = inject(HttpClient);
    private readonly customerService = inject(CustomerService);

    openModal = input<boolean>(false);
    closeModal = output<void>();
    reloadCustomers = output<void>();

    // Signal to handle HTTP errors in the UI
    submitError = signal<string | null>(null);
    isSubmitting = signal(false); // To disable button during request

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
        country_code: 'NG',
        created_at: null,
        updated_at: null,
    };

    readonly gendersArray: Gender[] = genders;

    readonly citiesArray: City[] = cities;

    // Reactive Form Group with Validators
    customerForm: FormGroup = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        surname: ['', [Validators.required, Validators.maxLength(30)]],
        birth_date: [new Date(), [Validators.required]],
        gender: [null, [Validators.required]],
        education: [null, []],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        city_id: [null, [Validators.required]],
        street: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
        country_code: 'NG',
    });

    // Comprehensive Validation Message Map
    readonly validationMessages: Record<string, Record<string, string>> = {
        title: { 
            required: 'Title is required', 
            minlength: 'Title is too short (min 2 characters)', 
            maxlength: 'Title cannot exceed 30 characters' 
        },
        name: { 
            required: 'Name is required', 
            minlength: 'Name is too short (min 2 characters)', 
            maxlength: 'Name cannot exceed 50 characters' 
        },
        surname: { 
            required: 'Surname is required', 
            maxlength: 'Surname cannot exceed 30 characters' 
        },
        birth_date: { 
            required: 'Birthday is required' 
        },
        gender: { 
            required: 'Gender selection is required' 
        },
        email: { 
            required: 'Email is required', 
            email: 'Please enter a valid email address' 
        },
        phone: { 
            required: 'Phone number is required', 
            pattern: 'Phone must contain only numbers' 
        },
        city_id: { 
            required: 'City selection is required' 
        },
        street: { 
            required: 'Street address is required', 
            minlength: 'Street is too short (min 2 characters)', 
            maxlength: 'Street cannot exceed 100 characters' 
        },
    };

    // Optimized helper to get error message
    getErrorMessage(controlName: string): string {
        const control = this.customerForm.get(controlName);
        if (control?.touched && control?.errors) {
            const firstErrorKey = Object.keys(control.errors || {})[0];
            return this.validationMessages[controlName]?.[firstErrorKey] || 'Invalid field';
        }
        return '';
    }

    onSubmit() {
        if (this.customerForm.invalid) {
            this.customerForm.markAllAsTouched();
            return;
        }
        
        this.submitError.set(null); // Reset error
        this.isSubmitting.set(true); // Start loading

        const payload = this.customerForm.getRawValue();

        payload.is_customer = true;
        payload.is_primary = true;

        this.customerService.createCustomer(payload).subscribe({
            next: () => {
                this.reloadCustomers.emit();
                this.closeModal.emit();
            },
            error: (err) => {
                this.isSubmitting.set(false);
                const msg = err.error?.message || 'Failed to create customer. Please try again.';
                this.submitError.set(msg);
            },
            complete: () => this.isSubmitting.set(false)
        });
    }
}
