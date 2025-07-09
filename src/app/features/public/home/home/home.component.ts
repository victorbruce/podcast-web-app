import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
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
  episodes$: Observable<Episode[]> = this.episodeService.episodes$;

  ngOnInit(): void {
    this.episodeService.getEpisodes().subscribe();
  }
}
