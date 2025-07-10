import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { EpisodeService, Episode } from '../../../../core/core.module';
import { EpisodeCardComponent } from '../../episode-card/episode-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EpisodeCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private episodeService = inject(EpisodeService);
  episodes$: Observable<Episode[]> = this.episodeService.episodes$.pipe(
    map((episodes) =>
      [...episodes].sort(
        (a, b) => new Date(b.posted_on).getTime() - new Date(a.posted_on).getTime()
      )
    )
  );

  // Track which episode is currently playing
  currentlyPlayingId: string | null = null;

  ngOnInit(): void {
    this.episodeService.getEpisodes().subscribe();
  }

  onRequestPlay(id: string) {
    this.currentlyPlayingId = this.currentlyPlayingId === id ? null : id;
  }
}
