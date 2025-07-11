import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../../core/core.module';
import { Playlist } from '../../../core/core.module';
import { finalize } from 'rxjs';
import { PlaylistModalComponent } from './components/create-playlist-modal/create.playlist-mmodal.component';

@Component({
  selector: 'app-playlist',
  imports: [CommonModule, PlaylistModalComponent],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent implements OnInit {
  private playlistService = inject(PlaylistService);
  playlists$ = this.playlistService.playlists$;
  error: string | null = null;
  loading = false;
  showModal = false;
  selectedPlaylist?: Playlist;

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.loading = true;
    this.error = null;

    this.playlistService
      .getPlaylists()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        error: (err) => {
          console.error('Failed to load plalist', err);
          this.error = 'Something went wrong while loading playlists. Please try again.';
        },
      });
  }

  deletePlaylist(id: number) {
    if (confirm('Are you sure you want to delete this playlist?')) {
      this.playlistService.deletePlaylist(id).subscribe();
    }
  }

  // Called when user clicks "+ New Playlist"
  openCreateModal() {
    this.selectedPlaylist = undefined;
    this.showModal = true;
  }

  // Called when user clicks "Edit" on a specific playlist
  openEditModal(playlist: Playlist) {
    console.log('editing playlist');
    this.selectedPlaylist = playlist;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedPlaylist = undefined;
  }

  get hasPlaylists(): boolean {
    return this.playlistService.totalPlaylists > 0;
  }
}
