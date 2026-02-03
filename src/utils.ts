import { DailyExchangeRateItem } from './models/brl-exchange.models';

export interface DailyExchangeRateWithDiff extends DailyExchangeRateItem {
  closeDiff: number | null; 
}

export function withCloseDiff(
  items: DailyExchangeRateItem[],
  opts: { sortAscendingByDate?: boolean } = { sortAscendingByDate: true }
): DailyExchangeRateWithDiff[] {
  const sorted = [...items].sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return (opts.sortAscendingByDate ?? true) ? da - db : db - da;
  });

  return sorted.map((item, idx) => {
    const prev = sorted[idx - 1];
    return {
      ...item,
      closeDiff: prev ? item.close - prev.close : null,
    };
  });
}
