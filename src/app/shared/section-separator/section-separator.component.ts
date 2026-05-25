import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-separator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-separator.component.html',
  styleUrl: './section-separator.component.css'
})
export class SectionSeparatorComponent {
  @Input() type: 'curve-1' | 'line' = 'line';
}
