import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpisodeService } from '../../../core/core.module';
import { Episode } from '../../../core/core.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episode-details',
  imports: [CommonModule],
  templateUrl: './episode-details.component.html',
  styleUrl: './episode-details.component.scss',
})
export class EpisodeDetailsComponent implements OnInit {
  private episodeService = inject(EpisodeService);
  private route = inject(ActivatedRoute);

  episode: Episode | undefined;

  ngOnInit(): void {
    const episodeID = Number(this.route.snapshot.paramMap.get('id'));
    if (episodeID) {
      this.episodeService.getEpisodeByID(episodeID).subscribe((episode) => {
        this.episode = episode;
      });
    }
  }
}
