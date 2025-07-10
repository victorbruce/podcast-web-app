import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'episodes',
        loadComponent: () => import('./episode/episode.component').then((m) => m.EpisodeComponent),
      },
      {
        path: 'playlists',
        loadComponent: () =>
          import('./playlist/playlist.component').then((m) => m.PlaylistComponent),
      },
      {
        path: 'confessions',
        loadComponent: () =>
          import('./confession/confession.component').then((m) => m.ConfessionComponent),
      },
      {
        path: 'teams',
        loadComponent: () => import('./team/team.component').then((m) => m.TeamComponent),
      },
    ],
  },
];
