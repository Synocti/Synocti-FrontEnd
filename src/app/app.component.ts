import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular_template';

  ngOnInit() {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply theme based on saved preference or system preference
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    // Set theme on both html and body elements
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);

    AOS.init({
      duration: 800,       // Animation duration in milliseconds
      easing: 'ease-out',  // Easing for animations
      once: true,          // Whether animations should happen only once
      mirror: false,       // Whether elements should animate out when scrolled past
      offset: 120,         // Offset (in px) from the original trigger point
      delay: 0,            // Delay before the animation starts
    });
  }
  onActivate(event: any) {
    window.scroll(0, 0);
  }
}
