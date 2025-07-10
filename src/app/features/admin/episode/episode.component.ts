import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeService } from '../../../core/core.module';

@Component({
  selector: 'app-episode',
  imports: [CommonModule],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.scss',
})
export class EpisodeComponent implements OnInit {
  private episodeService = inject(EpisodeService);

  total$ = this.episodeService.total$;
  episodes$ = this.episodeService.episodes$;

  ngOnInit(): void {
    this.episodeService.getEpisodes().subscribe();
  }
}
