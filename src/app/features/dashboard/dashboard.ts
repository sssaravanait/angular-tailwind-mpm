import { Component } from '@angular/core';
import { StatsSm } from '../../shared/components/stats-sm/stats-sm';

@Component({
    imports: [StatsSm],
    selector: 'app-dashboard',
    styleUrl: './dashboard.css',
    templateUrl: './dashboard.html',
})
export class Dashboard {
    dashboardStats = [
        { title: 'Total Users', value: '1,234' },
        { title: 'Active Sessions', value: '567' },
        { title: 'Revenue', value: '$12,345' }
    ];
}
