import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfessionService } from '../../../core/services/confession.service';

@Component({
  selector: 'app-confession',
  imports: [CommonModule],
  templateUrl: './confession.component.html',
  styleUrl: './confession.component.scss',
})
export class ConfessionComponent implements OnInit {
  private confessionService = inject(ConfessionService);

  $confessions$ = this.confessionService.confessions$;
  total$ = this.confessionService.total$;

  ngOnInit(): void {
    this.confessionService.getConfessions().subscribe();
  }
}
