import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../core/core.module';
import { EpisodeService, PlaylistService, ConfessionService } from '../../../core/core.module';

import { User } from '../../../core/core.module';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, DashboardCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private episodeService = inject(EpisodeService);
  private confessionService = inject(ConfessionService);
  private playlistService = inject(PlaylistService);
  private router = inject(Router);
  user: User | null = null;

  totalEpisodes$ = this.episodeService.total$;
  episodes$ = this.episodeService.episodes$;

  totalConfessions$ = this.confessionService.total$;
  totalPlaylists$ = this.playlistService.total$;

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.user = user;
    this.episodeService.getEpisodes().subscribe();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('User logged out');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Logout failed:', err.message);
        // Optionally still navigate to login
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
