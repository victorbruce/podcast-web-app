import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../../core/core.module';

@Component({
  selector: 'app-playlist',
  imports: [CommonModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent implements OnInit {
  private playlistService = inject(PlaylistService);
  total$ = this.playlistService.total$;
  playlists$ = this.playlistService.playlists$;

  ngOnInit(): void {
    this.playlistService.getPlaylists().subscribe();
  }
}
