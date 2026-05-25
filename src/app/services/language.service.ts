import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>(this.getInitialLanguage());
  public language$ = this.languageSubject.asObservable();

  getCurrentLanguage(): string {
    return this.languageSubject.value;
  }

  setLanguage(lang: string): void {
    if (['en', 'fr'].includes(lang)) {
      localStorage.setItem('lang', lang);
      this.languageSubject.next(lang);
    }
  }

  private getInitialLanguage(): string {
    const langCookie = localStorage.getItem('lang');
    const browserLang = navigator.language?.substring(0, 2);
    if (langCookie && ['en', 'fr'].includes(langCookie)) {
      return langCookie;
    } else if (browserLang && ['en', 'fr'].includes(browserLang)) {
      return browserLang;
    } else {
      return 'fr';
    }
  }
}
