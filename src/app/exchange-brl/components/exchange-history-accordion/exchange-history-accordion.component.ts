import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { HistoryVM } from '../../../../models/brl-exchange.models';

@Component({
  standalone: true,
  selector: 'app-exchange-history-accordion',
  imports: [CommonModule, DatePipe, CurrencyPipe, DecimalPipe],
  templateUrl: './exchange-history-accordion.component.html',
})
export class ExchangeHistoryAccordionComponent {
  @Input({ required: true }) items: HistoryVM[] = [];
  expanded = false;

  get sortedItems(): HistoryVM[] {
    return [...this.items].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
}
