import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SocialIconComponent } from '../shared/social-icon/social-icon.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterModule, SocialIconComponent, TranslateModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})
export class FooterComponent {
}
