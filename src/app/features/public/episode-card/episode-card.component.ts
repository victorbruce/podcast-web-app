import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Episode } from '../../../core/core.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss'],
})
export class EpisodeCardComponent implements OnInit, OnChanges {
  @Input() episode!: Episode;
  @Input() currentlyPlayingId!: number | null;
  @Input() isFeatured = false;
  @Output() requestPlay = new EventEmitter<number>();
  private router = inject(Router);

  isPlaying = false;
  progress = 0;
  remainingTime = '';
  durationFormatted = '';
  hoverTime = '';
  private audio!: HTMLAudioElement;

  ngOnInit(): void {
    // Preload metadata to get duration on load
    this.audio = new Audio(this.episode.audio_url);
    this.audio.addEventListener('loadedmetadata', () => {
      this.durationFormatted = this.formatTime(this.audio.duration);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentlyPlayingId === this.episode.id) {
      if (!this.isPlaying) this.playAudio();
    } else if (this.isPlaying) {
      this.stopAudio();
    }
  }

  onPlayClick(): void {
    const id = this.episode.id;

    if (this.isPlaying && this.currentlyPlayingId === id) {
      this.requestPlay.emit(-1); // Use -1 to indicate pause
    } else {
      this.requestPlay.emit(id);
    }
  }

  private playAudio(): void {
    if (!this.audio) {
      this.audio = new Audio(this.episode.audio_url);
    }

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.progress = 0;
      this.remainingTime = '';
    });

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio.duration) {
        this.progress = (this.audio.currentTime / this.audio.duration) * 100;
        const timeLeft = this.audio.duration - this.audio.currentTime;
        this.remainingTime = this.formatTime(timeLeft, true); // Show remaining time
      }
    });

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

  private formatTime(seconds: number, withSuffix = false): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    return withSuffix ? `${formatted} remaining` : formatted;
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
    this.hoverTime = this.formatTime(seconds);
  }

  navigateToDetails(episode: Episode) {
    this.router.navigate(['episodes', episode.id]);
  }
}
