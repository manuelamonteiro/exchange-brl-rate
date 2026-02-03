import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import {
    CurrentExchangeRateResponse,
    DailyExchangeRateResponse,
} from '../models/brl-exchange.models';

type CurrencyCode = string;

@Injectable({ providedIn: 'root' })
export class BrlExchangeService {
    private readonly baseUrl = environment.apiBaseUrl;
    private readonly apiKey = environment.apiKey;

    constructor(private readonly http: HttpClient) { }

    getCurrentExchangeRate(
        fromSymbol: CurrencyCode,
        toSymbol: CurrencyCode
    ): Observable<CurrentExchangeRateResponse> {
        const url = `${this.baseUrl}/open/currentExchangeRate`;

        const params = this.buildParams({
            from_symbol: fromSymbol,
            to_symbol: toSymbol,
        });

        return this.http.get<CurrentExchangeRateResponse>(url, { params });
    }

    getDailyExchangeRate(
        fromSymbol: CurrencyCode,
        toSymbol: CurrencyCode
    ): Observable<DailyExchangeRateResponse> {
        const url = `${this.baseUrl}/open/dailyExchangeRate`;

        const params = this.buildParams({
            from_symbol: fromSymbol,
            to_symbol: toSymbol,
        });

        return this.http.get<DailyExchangeRateResponse>(url, { params });
    }

    private buildParams(extra: Record<string, string>): HttpParams {
        let params = new HttpParams().set('apiKey', this.apiKey);
        for (const [key, value] of Object.entries(extra)) {
            params = params.set(key, value);
        }
        return params;
    }
}
