import { Injectable, inject } from '@angular/core';
import { map, Observable, BehaviorSubject, tap } from 'rxjs';

import { ApiClientService } from './api-client.service';
import { Episode, EpisodeResponse } from '../core.module';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private apiClient = inject(ApiClientService);
  private episodesSubject = new BehaviorSubject<Episode[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  episodes$ = this.episodesSubject.asObservable();
  total$ = this.totalSubject.asObservable();

  constructor() {}

  getEpisodes(): Observable<EpisodeResponse> {
    return this.apiClient.get<EpisodeResponse>('/episodes').pipe(
      tap((response) => {
        const sortedEpisodes = [...response.data].sort(
          (a, b) => new Date(b.posted_on).getTime() - new Date(a.posted_on).getTime()
        );
        this.episodesSubject.next(sortedEpisodes);
        this.totalSubject.next(response.meta.total ?? sortedEpisodes.length);
      })
    );
  }

  get currentEpisodes(): Episode[] {
    return this.episodesSubject.getValue();
  }

  get totalEpisodes(): number {
    return this.totalSubject.getValue();
  }

  getEpisodeByID(episodeID: number): Observable<Episode | undefined> {
    return this.apiClient
      .get<EpisodeResponse>('/episodes')
      .pipe(map((response) => response.data.find((episode) => episode.id === episodeID)));
  }
}
