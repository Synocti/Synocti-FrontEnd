import { Injectable } from '@angular/core';
import { ServiceCard } from '../cards/service-card/service-card.component';

@Injectable({
  providedIn: 'root'
})
export class HomeDataService {
  private serviceCards: ServiceCard[] = [
    {
      icon: 'fa-globe',
      titleKey: 'services.servicesList.web.title',
      descriptionKey: 'services.servicesList.web.description',
      link: '/services'
    },
    {
      icon: 'fa-mobile-alt',
      titleKey: 'services.servicesList.mobile.title',
      descriptionKey: 'services.servicesList.mobile.description',
      link: '/services'
    },
    {
      icon: 'fa-desktop',
      titleKey: 'services.servicesList.desktop.title',
      descriptionKey: 'services.servicesList.desktop.description',
      link: '/services'
    },
    {
      icon: 'fa-server',
      titleKey: 'services.servicesList.hosting.title',
      descriptionKey: 'services.servicesList.hosting.description',
      link: '/services'
    }
  ];

  constructor() { }

  getServiceCards(): ServiceCard[] {
    return this.serviceCards;
  }
}
