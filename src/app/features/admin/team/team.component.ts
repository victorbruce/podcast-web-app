import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMemberService } from '../../../core/services/team.service';

@Component({
  selector: 'app-team',
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit {
  private teamMemberService = inject(TeamMemberService);

  total$ = this.teamMemberService.total$;
  teamMembers$ = this.teamMemberService.teamMembers$;

  ngOnInit(): void {
    this.teamMemberService.getTeamMembers().subscribe();
  }
}
