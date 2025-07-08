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
  episodes$ = this.episodesSubject.asObservable();

  constructor() {}

  getEpisodes(): Observable<EpisodeResponse> {
    return this.apiClient
      .get<EpisodeResponse>('/episodes')
      .pipe(tap((response) => this.episodesSubject.next(response.data)));
  }

  get currentEpisodes(): Episode[] {
    return this.episodesSubject.getValue();
  }
}
