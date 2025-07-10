import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Episode } from '../../../core/core.module';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss'],
})
export class EpisodeCardComponent implements OnChanges {
  @Input() episode!: Episode;
  @Input() currentlyPlayingId!: string | null;
  @Output() requestPlay = new EventEmitter<string>();

  isPlaying = false;
  progress = 0;
  remainingTime = '';
  durationFormatted = '';
  hoverTime = '';
  hoverX = 0;

  private audio!: HTMLAudioElement;

  ngOnChanges(changes: SimpleChanges): void {
    const currentId = String(this.episode.id);

    if (this.currentlyPlayingId === currentId) {
      if (!this.isPlaying) this.playAudio();
    } else if (this.isPlaying) {
      this.stopAudio();
    }
  }

  onPlayClick(): void {
    const id = String(this.episode.id);

    if (this.isPlaying && this.currentlyPlayingId === id) {
      this.requestPlay.emit(''); // Pause
    } else {
      this.requestPlay.emit(id); // Play
    }
  }

  private playAudio(): void {
    if (!this.audio) {
      this.audio = new Audio(this.episode.audio_url);

      this.audio.addEventListener('loadedmetadata', () => {
        this.durationFormatted = this.formatTime(this.audio.duration, false);
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.progress = 0;
        this.remainingTime = '';
      });

      this.audio.addEventListener('timeupdate', () => {
        if (this.audio.duration) {
          this.progress = (this.audio.currentTime / this.audio.duration) * 100;
          const timeLeft = this.audio.duration - this.audio.currentTime;
          this.remainingTime = this.formatTime(timeLeft, true);
        }
      });
    }

    this.audio.play();
    this.isPlaying = true;
  }

  private stopAudio(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.isPlaying = false;
    this.progress = 0;
    this.remainingTime = '';
  }

  seekAudio(event: MouseEvent): void {
    if (!this.audio || !this.audio.duration) return;

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;

    this.audio.currentTime = this.audio.duration * percentage;
  }

  onHoverProgress(event: MouseEvent): void {
    if (!this.audio || !this.audio.duration) return;

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = x / rect.width;
    const seconds = this.audio.duration * percentage;

    this.hoverTime = this.formatTime(seconds, false);
    this.hoverX = x - 20;
  }

  formatTime(seconds: number, withLabel: boolean = false): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const base = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    return withLabel ? `${base} remaining` : base;
  }
}
