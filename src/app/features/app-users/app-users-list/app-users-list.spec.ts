import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppUsersList } from './app-users-list';

describe('AppUsersList', () => {
    let component: AppUsersList;
    let fixture: ComponentFixture<AppUsersList>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppUsersList],
        }).compileComponents();

        fixture = TestBed.createComponent(AppUsersList);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
