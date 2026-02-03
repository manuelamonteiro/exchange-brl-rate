import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-exchange-header',
  templateUrl: './exchange-header.component.html',
})
export class ExchangeHeaderComponent {
  @Output() logoClick = new EventEmitter<void>();

  onLogoClick() {
    this.logoClick.emit();
  }
}
