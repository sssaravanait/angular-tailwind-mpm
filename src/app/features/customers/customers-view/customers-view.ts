import { Component, OnInit, inject, input, output, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { LabelModule } from 'primeng/label';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';

import { CustomerService } from '@services/customer.service';
import { genders } from '@shared/common.constants';
import { Customer, Gender } from '@shared/common.interfaces';

@Component({
    imports: [
        CommonModule, 
        CardModule, 
        ButtonModule, 
        TableModule, 
        AvatarModule,
        SelectModule,
        InputTextModule,
        LabelModule,
        InputMaskModule,
        DatePickerModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    selector: 'app-customers-view',
    styleUrl: './customers-view.css',
    templateUrl: './customers-view.html',
})
export class CustomersView implements OnInit {

    private readonly route = inject(ActivatedRoute);
    private readonly customerService = inject(CustomerService);
    private fb = inject(FormBuilder);

    // Signal to hold customer data
    customer = signal<Customer | null>(null);
    loading = signal(false);
    error = signal<string | null>(null);

    detailsSectionEditing = signal(false);
    readonly gendersArray: Gender[] = genders;

    // Signal to handle HTTP errors in the UI
    submitError = signal<string | null>(null);
    isSubmitting = signal(false); // To disable button during request

    // Reactive Form Group with Validators
    customerForm: FormGroup = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        surname: ['', [Validators.required, Validators.maxLength(30)]],
        birth_date: [new Date(), [Validators.required]],
        gender: [null, [Validators.required]],
        education: [null, []],
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

    ngOnInit(): void {
        // Get the ID from the route parameter /people/:id
        const id = Number(this.route.snapshot.paramMap.get('id'));
        
        if (isNaN(id)) {
            this.error.set('Invalid Customer ID');
            return;
        }

        this.loadCustomer(id);
    }

    private loadCustomer(id: number) {
        this.loading.set(true);
        this.customerService.getCustomer(id).subscribe({
            next: (response: any) => {
                // this.customer.set(response.data);
                // this.loading.set(false);

                const customerData = response.data;
                this.customer.set(customerData);
                
                // SET DATA INTO FORM
                // Ensure date is a JS Date object for p-calendar
                const formValues = {
                    ...customerData,
                    birth_date: customerData.birth_date ? new Date(customerData.birth_date) : null
                };
                this.customerForm.patchValue(formValues);

                this.loading.set(false);
                // this.editLoading.set(false);
            },
            error: (err) => {
                this.error.set('Unable to fetch customer details.');
                this.loading.set(false);
                // this.editLoading.set(false);
                this.detailsSectionEditing.set(false); // Exit edit mode on error
            }
        });
    }

    onSubmit() {
        if (this.customerForm.invalid) {
            this.customerForm.markAllAsTouched();
            return;
        }

        const customerId = this.customer()?.id;
        if (!customerId) {
            this.submitError.set('Customer ID is missing. Cannot update.');
            return;
        }
        
        this.submitError.set(null); // Reset error
        this.isSubmitting.set(true); // Start loading

        const payload = this.customerForm.getRawValue();

        this.customerService.updateCustomer(customerId, payload).subscribe({
            next: () => {
                this.loadCustomer(customerId);
                this.detailsSectionEditing.set(false);
            },
            error: (err) => {
                this.isSubmitting.set(false);
                const msg = err.error?.message || 'Failed to create customer. Please try again.';
                this.submitError.set(msg);
            },
            complete: () => this.isSubmitting.set(false)
        });
    }

    cancelEdit() {
        this.detailsSectionEditing.set(false);
        this.customerForm.reset(); // Clear form state
        this.loadCustomer(this.customer()!.id); // Reload original data into form
    }
}
