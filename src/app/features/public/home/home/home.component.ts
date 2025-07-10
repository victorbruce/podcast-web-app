import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  featuredEpisode!: Episode;
  visibleEpisodes: Episode[] = [];
  allEpisodes: Episode[] = [];
  currentlyPlayingId: number | null = null;
  showAll = false;

  ngOnInit(): void {
    this.episodeService.getEpisodes().subscribe((response) => {
      // If response is wrapped in an object like { data: Episode[] }, fix this:
      const episodes = Array.isArray(response) ? response : (response?.data ?? []);

      const sorted = [...episodes].sort(
        (a, b) => new Date(b.posted_on).getTime() - new Date(a.posted_on).getTime()
      );

      this.featuredEpisode = sorted[0];
      this.allEpisodes = sorted.slice(1);
      this.visibleEpisodes = this.allEpisodes.slice(0, 4);
    });
  }

  seeMore(): void {
    this.visibleEpisodes = [...this.allEpisodes];
    this.showAll = true;
  }

  onRequestPlay(id: number) {
    this.currentlyPlayingId = id === -1 ? null : id;
  }
}
