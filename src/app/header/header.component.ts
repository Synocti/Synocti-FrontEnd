
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  activeDropdown: string | null = null;
  isDarkTheme = false;
  isScrolled = false;
  language: string = 'fr';

  constructor(public translator: TranslateService, private languageService: LanguageService) {
    this.language = this.languageService.getCurrentLanguage();
    translator.setDefaultLang(this.language);
    translator.use(this.language)
  }

  ngOnInit() {
    // Initialize theme state from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set isDarkTheme based on saved preference or system preference
    this.isDarkTheme = savedTheme === 'dark' || (savedTheme === null && prefersDark);

    this.checkScroll();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  toggleDropdown(dropdownName: string, event: Event) {
    event.preventDefault();
    this.activeDropdown = this.activeDropdown === dropdownName ? null : dropdownName;
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const theme = this.isDarkTheme ? 'dark' : 'light';

    // Apply theme to both html and body elements
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);

    // Save preference
    localStorage.setItem('theme', theme);
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    // Check if page is scrolled more than 50px
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const drawer = document.querySelector('.drawer');
    const langToggle = document.querySelector('.lang-toggle');

    // Check if click is outside drawer
    if (this.isMenuOpen &&
      drawer &&
      !drawer.contains(target) &&
      !target.closest('.mobile-menu-toggle')) {
      this.closeMenu();
    }

    // Check if click is outside language dropdown and not on the toggle itself
    if (this.activeDropdown === 'language' &&
      langToggle &&
      !langToggle.contains(target) &&
      !target.closest('.lang-dropdown .dropdown-menu')) {
      this.activeDropdown = null;
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

  changeLanguage(lang: string) {
    this.language = lang;
    this.translator.use(lang);
    this.languageService.setLanguage(lang);
    this.activeDropdown = null;
  }
}
