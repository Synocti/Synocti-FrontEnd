import { Component, Input } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Project } from '../../models/project';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-portfolio-item',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './portfolio-item.component.html',
  styleUrl: './portfolio-item.component.css'
})
export class PortfolioItemComponent {
  @Input() project!: Project;

  constructor(private apiService: ApiService) { }

  getImageUrl(picturePath: string): string | null {
    return this.apiService.getImageUrl(picturePath);
  }
}
