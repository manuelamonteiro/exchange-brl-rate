export interface CurrentExchangeRateResponse {
  exchangeRate: number;
  fromSymbol: string;
  toSymbol: string;
  lastUpdatedAt: string | Date;
  rateLimitExceeded: boolean;
  success: boolean;
}

export interface DailyExchangeRateItem {
  open: number;
  high: number;
  low: number;
  close: number;
  date: string | Date;
}

export interface DailyExchangeRateResponse {
  data: DailyExchangeRateItem[];
}

export interface HistoryVM {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  closeDiffPct: number | null;
}

export interface CurrentVM {
  exchangeRate: number;
  lastUpdatedAt: string;
  pairLabel: string;
}
