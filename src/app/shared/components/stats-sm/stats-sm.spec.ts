import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsSm } from './stats-sm';

describe('StatsSm', () => {
    let component: StatsSm;
    let fixture: ComponentFixture<StatsSm>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StatsSm],
        }).compileComponents();

        fixture = TestBed.createComponent(StatsSm);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
