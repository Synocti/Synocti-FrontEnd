import { Component, OnInit, OnDestroy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiService } from '../services/api.service';
import { Project } from '../models/project';
import { PortfolioItemComponent } from '../cards/portfolio-item/portfolio-item.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    RouterModule,
    PortfolioItemComponent,
    TranslateModule
],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  private destroy$ = new Subject<void>();

  constructor(private apiService: ApiService, private languageService: LanguageService) { }

  async ngOnInit() {
    await this.loadProjects();

    // Recharger les projets quand la langue change
    this.languageService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async () => {
        await this.loadProjects();
      });
  }

  private async loadProjects() {
    const language = this.languageService.getCurrentLanguage();
    const result = await this.apiService.getProjects(language);
    if (result.success && result.data) {
      this.projects = result.data;
    } else {
      console.error('Error getting projects:', result.error);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
