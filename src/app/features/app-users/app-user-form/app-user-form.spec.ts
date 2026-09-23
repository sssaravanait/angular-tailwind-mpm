import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppUserForm } from './app-user-form';

describe('AppUserForm', () => {
    let component: AppUserForm;
    let fixture: ComponentFixture<AppUserForm>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppUserForm],
        }).compileComponents();

        fixture = TestBed.createComponent(AppUserForm);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
