import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EpisodeService } from '../../../../core/core.module';
import { Episode } from '../../../../core/core.module';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private episodeService = inject(EpisodeService);
  episodes$!: Observable<Episode[]>;

  ngOnInit(): void {
    this.episodes$ = this.episodeService.episodes$;
    this.episodeService.getEpisodes().subscribe((data) => console.log('episodes', data));
  }
}
