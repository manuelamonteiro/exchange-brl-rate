import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-exchange-footer',
  templateUrl: './exchange-footer.component.html',
})
export class ExchangeFooterComponent {
  readonly year = new Date().getFullYear();
}
