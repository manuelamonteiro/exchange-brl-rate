import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { CurrentVM, HistoryVM } from '../../models/brl-exchange.models';
import { BrlExchangeService } from '../../service/api';
import { CurrencyFormComponent } from './components/currency-form/currency-form.component';
import { ExchangeCurrentResultComponent } from './components/exchange-current-result/exchange-current-result.component';
import { ExchangeFooterComponent } from './components/exchange-footer/exchange-footer.component';
import { ExchangeHeaderComponent } from './components/exchange-header/exchange-header.component';
import { ExchangeHistoryAccordionComponent } from './components/exchange-history-accordion/exchange-history-accordion.component';

@Component({
  standalone: true,
  selector: 'app-exchange-brl-page',
  imports: [
    CommonModule,
    ExchangeHeaderComponent,
    CurrencyFormComponent,
    ExchangeCurrentResultComponent,
    ExchangeHistoryAccordionComponent,
    ExchangeFooterComponent,
  ],
  templateUrl: './exchange-brl.page.html',
})
export class ExchangeBrlPage {
  loading = false;
  errorMsg: string | null = null;

  readonly currentYear = new Date().getFullYear();

  fromSymbol = '';

  current: CurrentVM | null = null;
  history: HistoryVM[] = [];

  constructor(private api: BrlExchangeService) { }

  onReset(): void {
    this.fromSymbol = '';
    this.current = null;
    this.history = [];
    this.errorMsg = null;
  }

  async onSearch(fromSymbol: string): Promise<void> {
    this.errorMsg = null;
    this.loading = true;
    this.current = null;
    this.history = [];

    const from = (fromSymbol ?? '').trim().toUpperCase();
    if (!from) {
      this.errorMsg = 'Type a currency code (ex: USD, EUR...)';
      this.loading = false;
      return;
    }

    try {
      const current = await firstValueFrom(this.api.getCurrentExchangeRate(from, 'BRL'));

      const lastUpdated = current?.lastUpdatedAt ?? '';
      const tempCurrent: CurrentVM = {
        exchangeRate: current?.exchangeRate ?? 0,
        lastUpdatedAt: typeof lastUpdated === 'string' ? lastUpdated : lastUpdated.toISOString(),
        pairLabel: `${from}/BRL`,
      };

      const daily = await firstValueFrom(this.api.getDailyExchangeRate(from, 'BRL'));

      const sorted = [...(daily?.data ?? [])].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      const last30 = sorted.slice(-30);

      const tempHistory: HistoryVM[] = last30.map((d, idx) => {
        const prev = last30[idx - 1];
        const closeDiffPct =
          !prev || prev.close === 0 ? null : ((d.close - prev.close) / prev.close) * 100;
        const dateStr = typeof d.date === 'string' ? d.date : d.date.toISOString();

        return { date: dateStr, open: d.open, high: d.high, low: d.low, close: d.close, closeDiffPct };
      });

      this.current = tempCurrent;
      this.history = tempHistory;
      this.fromSymbol = from;
    } catch (e) {
      this.errorMsg = 'Failed to load exchange rates. Try again.';
    } finally {
      this.loading = false;
    }
  }
}
