import { Component, Input } from '@angular/core';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pricing-card',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './pricing-card.component.html',
  styleUrl: './pricing-card.component.css'
})
export class PricingCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() featuresKey: string = '';
  @Input() serviceId: string = '';
  @Input() icon: string = '';
}
