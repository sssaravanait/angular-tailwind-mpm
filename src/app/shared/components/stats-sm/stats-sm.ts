import { Component, input } from '@angular/core';

@Component({
    selector: 'app-stats-sm',
    styleUrl: './stats-sm.css',
    templateUrl: './stats-sm.html',
    host: {
        class: 'flex-1'
    }
})
export class StatsSm {
    title = input('Default Title');
    value = input('$0.00');
}
