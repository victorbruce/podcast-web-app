import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';

import { ApiClientService } from './api-client.service';
import { Playlist, PlaylistListResponse, PlaylistResponse } from '../core.module';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private apiClient = inject(ApiClientService);
  private playlistsSubject = new BehaviorSubject<Playlist[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  playlists$ = this.playlistsSubject.asObservable();
  total$ = this.totalSubject.asObservable();

  constructor() {}

  getPlaylists(): Observable<Playlist[]> {
    return this.apiClient.get<PlaylistListResponse>('/playlists').pipe(
      tap((res) => {
        this.playlistsSubject.next(res.data.data);
        this.totalSubject.next(res.data.total);
      }),
      map((res) => res.data.data)
    );
  }

  get currentPlaylists(): Playlist[] {
    return this.playlistsSubject.getValue();
  }

  get totalPlaylists(): number {
    return this.totalSubject.getValue();
  }

  getPlaylist(id: number): Observable<Playlist> {
    return this.apiClient.get<PlaylistResponse>(`/playlists/${id}`).pipe(map((res) => res.data));
  }

  createPlaylist(payload: Partial<Playlist>): Observable<Playlist> {
    return this.apiClient.post<{ status: string; data: Playlist }>('/playlists', payload).pipe(
      map((res) => res.data), // <-- This unwraps the actual playlist
      tap((created) => {
        const updated = [...this.currentPlaylists, created];
        this.playlistsSubject.next(updated);
        this.totalSubject.next(updated.length);
      })
    );
  }

  updatePlaylist(id: number, payload: Partial<Playlist>): Observable<Playlist> {
    return this.apiClient.put<any>(`/playlists/${id}`, payload).pipe(
      map((res) => res.data),
      tap((updatedPlaylist) => {
        const updated = this.currentPlaylists.map((p) => (p.id === id ? updatedPlaylist : p));
        this.playlistsSubject.next(updated);
      })
    );
  }

  deletePlaylist(id: number): Observable<void> {
    return this.apiClient.delete(`/playlists/${id}`).pipe(
      tap(() => {
        const updated = this.currentPlaylists.filter((p) => p.id !== id);
        this.playlistsSubject.next(updated);
        this.totalSubject.next(updated.length);
      })
    );
  }
}
