import { Injectable, inject } from '@angular/core';
import { map, Observable, BehaviorSubject, tap } from 'rxjs';

import { ApiClientService } from './api-client.service';
// import { Episode, EpisodeResponse } from '../core.module';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private apiClient = inject(ApiClientService);
  private playlistsSubject = new BehaviorSubject<any[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  playlists$ = this.playlistsSubject.asObservable();
  total$ = this.totalSubject.asObservable();

  constructor() {}

  getPlaylists(): Observable<any> {
    return this.apiClient.get<any>('/playlists').pipe(
      tap((response) => {
        this.playlistsSubject.next(response.data);
        this.totalSubject.next(response.meta.total ?? response.data.length);
      })
    );
  }

  get currentPlaylists(): any[] {
    return this.playlistsSubject.getValue();
  }

  get totalPlaylists(): number {
    return this.totalSubject.getValue();
  }
}
