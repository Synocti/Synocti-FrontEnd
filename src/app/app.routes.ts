import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { OfferedServiceComponent } from './offered-service/offered-service.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { StoryComponent } from './story/story.component';
import { TeamComponent } from './team/team.component';
import { LegalComponent } from './legal/legal.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "services", component: OfferedServiceComponent },
    { path: "portfolio", component: PortfolioComponent },
    { path: "story", component: StoryComponent },
    { path: "team", component: TeamComponent },
    { path: "contact", component: ContactComponent },
    { path: "legal/:document", component: LegalComponent },

    { path: "**", component: NotFoundComponent } //Has to be the last route
];
