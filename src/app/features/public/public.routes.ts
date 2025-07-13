import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { EpisodeDetailsComponent } from './episode-details/episode-details.component';

export const publicRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'episodes/:id', component: EpisodeDetailsComponent },
];
