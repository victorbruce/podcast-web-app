import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Playlist, Episode } from '../../../../../core/core.module';
import { PlaylistService } from '../../../../../core/services/playlist.service';
import { EpisodeService } from '../../../../../core/services/episode.service';

@Component({
  selector: 'app-create-playlist-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-playlist-modal.component.html',
  styleUrl: './create-playlist-modal.component.scss',
})
export class PlaylistModalComponent implements OnInit {
  @Input() playlist?: Playlist;
  @Output() close = new EventEmitter<void>();

  playlistForm!: FormGroup;
  episodes: Episode[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService,
    private episodeService: EpisodeService
  ) {}

  ngOnInit(): void {
    this.playlistForm = this.fb.group({
      title: [this.playlist?.name ?? '', Validators.required],
      description: [this.playlist?.description ?? '', Validators.required],
      episode_ids: [this.playlist?.episodes?.map((e) => e.id) ?? []],
    });

    this.episodeService.getEpisodes().subscribe({
      next: (res) => {
        this.episodes = res.data;
      },
      error: (err) => {
        console.error('Failed to load episodes', err);
      },
    });
  }

  submitForm() {
    if (this.playlistForm.invalid) return;

    const payload = {
      name: this.playlistForm.value.title,
      description: this.playlistForm.value.description,
      episode_ids: this.playlistForm.value.episode_ids,
    };

    this.loading = true;

    console.log('payload', payload);
    console.log('playlist:', this.playlist);

    const request$ = this.playlist
      ? this.playlistService.updatePlaylist(this.playlist.id, payload)
      : this.playlistService.createPlaylist(payload);

    request$.subscribe({
      next: () => {
        this.loading = false;
        alert(this.playlist ? 'Playlist updated successfully!' : 'Playlist created successfully!');
        this.close.emit();
      },
      error: (err) => {
        this.loading = false;
        alert('Failed to save playlist. Please try again.');
        console.error('Playlist save failed', err);
      },
    });
  }

  closeModal() {
    this.close.emit();
  }
}
