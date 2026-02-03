import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exchange-current-result',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './exchange-current-result.component.html',
})
export class ExchangeCurrentResultComponent {
  @Input() pairLabel = '';
  @Input() exchangeRate = 0;

  @Input() lastUpdatedAt: string | Date | null = null;

  get lastUpdatedAtDate(): Date | null {
    if (!this.lastUpdatedAt) return null;
    if (this.lastUpdatedAt instanceof Date) return this.lastUpdatedAt;

    return normalizeApiDate(this.lastUpdatedAt);
  }
}

function normalizeApiDate(raw: string): Date | null {
  const s = raw.trim();
  if (!s) return null;

  const match = s.match(/^(.+?)(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/);
  if (!match) {
    const d0 = new Date(s);
    return Number.isNaN(d0.getTime()) ? null : d0;
  }

  const base = match[1];
  const frac = match[2] ?? '';
  const tz = match[3] ?? '';

  let fixedFrac = '';
  if (frac) {
    const digits = frac.slice(1);
    const ms = digits.padEnd(3, '0').slice(0, 3);
    fixedFrac = `.${ms}`;
  }

  const fixedTz = tz || 'Z';
  const iso = `${base}${fixedFrac}${fixedTz}`;

  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}
