import { Routes } from '@angular/router';
import { PracticePage } from './practice-page/practice-page.component';
import { DailyPage } from './daily-page/daily-page';

export const routes: Routes = [
    {
        path: '',
        component: PracticePage
    },
    {
        path: 'daily',
        component: DailyPage
    }
];
