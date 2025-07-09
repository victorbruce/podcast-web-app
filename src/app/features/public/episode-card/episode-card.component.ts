import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Episode } from '../../../core/core.module';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss'],
})
export class EpisodeCardComponent {
  @Input() episode!: Episode;
  isPlaying = false;
  private audio!: HTMLAudioElement;

  onPlayClick(): void {
    if (!this.audio) {
      this.audio = new Audio(this.episode.audio_url);
      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
      });
    }

    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }

    this.isPlaying = !this.isPlaying;
  }
}
