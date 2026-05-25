import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ServiceCardComponent, ServiceCard } from '../cards/service-card/service-card.component';
import { PortfolioItemComponent } from '../cards/portfolio-item/portfolio-item.component';
import { HomeDataService } from '../services/home-data.service';
import { Project } from '../models/project';
import { ApiService } from '../services/api.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    ServiceCardComponent,
    PortfolioItemComponent,
    TranslateModule
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  serviceCards: ServiceCard[] = [];
  portfolioItems: Project[] = [];
  private destroy$ = new Subject<void>();

  constructor(private homeDataService: HomeDataService, private apiService: ApiService, private languageService: LanguageService) { }

  async ngOnInit() {
    this.serviceCards = this.homeDataService.getServiceCards();
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
      this.portfolioItems = result.data;
    } else {
      console.error('Error getting projects:', result.error);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
