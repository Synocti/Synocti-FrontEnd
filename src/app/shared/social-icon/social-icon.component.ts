import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-icon',
  standalone: true,
  imports: [],
  templateUrl: './social-icon.component.html',
  styleUrl: './social-icon.component.css'
})
export class SocialIconComponent {
  @Input() link: string = '';
  @Input() icon: string = '';
}
