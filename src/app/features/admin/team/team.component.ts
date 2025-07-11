import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMemberService } from '../../../core/services/team.service';
import { CreateTeamModalComponent } from './components/create-team-modal/create-team-modal.component';
import { TeamMember } from '../../../core/core.module';

@Component({
  selector: 'app-team',
  imports: [CommonModule, CreateTeamModalComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit {
  private teamMemberService = inject(TeamMemberService);

  total$ = this.teamMemberService.total$;
  teamMembers$ = this.teamMemberService.teamMembers$;
  selectedTeamMember?: TeamMember;

  openModal = false;

  ngOnInit(): void {
    this.teamMemberService.getTeamMembers().subscribe();
  }

  showModal(): void {
    this.openModal = true;
  }

  hideModal(): void {
    this.openModal = false;
  }

  openEditModal(member: TeamMember) {
    this.selectedTeamMember = member;
    this.openModal = true;
  }

  onModalClose() {
    this.openModal = false;
    this.selectedTeamMember = undefined;
  }

  deleteMember(id: number) {
    if (confirm('Are you sure you want to delete this team member?')) {
      this.teamMemberService.deleteTeamMember(id).subscribe({
        next: () => console.log('Deleted successfully'),
        error: (err) => console.error('Failed to delete:', err),
      });
    }
  }
}
