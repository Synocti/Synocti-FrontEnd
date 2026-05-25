import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [
    RouterModule,
    TranslateModule
],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent {
  values = [
    {
      titleKey: 'story.values.excellence.title',
      descriptionKey: 'story.values.excellence.description',
      icon: 'fa-star'
    },
    {
      titleKey: 'story.values.innovation.title',
      descriptionKey: 'story.values.innovation.description',
      icon: 'fa-lightbulb'
    },
    {
      titleKey: 'story.values.integrity.title',
      descriptionKey: 'story.values.integrity.description',
      icon: 'fa-shield-alt'
    },
    {
      titleKey: 'story.values.collaboration.title',
      descriptionKey: 'story.values.collaboration.description',
      icon: 'fa-users'
    }
  ];
}
