import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basic-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basic-card.component.html',
  styleUrl: './basic-card.component.css'
})
export class BasicCardComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() animationDelay: number = 0;
}
