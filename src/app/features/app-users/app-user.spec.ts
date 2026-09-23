import { TestBed } from '@angular/core/testing';
import { AppUser } from './app-user';

describe('AppUser', () => {
    let service: AppUser;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AppUser);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
