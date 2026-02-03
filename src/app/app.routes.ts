import { Routes } from '@angular/router';
import { ExchangeBrlPage } from './exchange-brl/exchange-brl.page';

export const routes: Routes = [
  { path: 'exchange-brl', component: ExchangeBrlPage, title: 'BRL Exchange Rate' },
  { path: '**', redirectTo: 'exchange-brl', pathMatch: 'full' },
];
