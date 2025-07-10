import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TeamMemberService } from '../../../../../core/services/team.service';
import { TeamMember, SocialMediaLink } from '../../../../../core/core.module';

@Component({
  selector: 'app-create-team-modal',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-team-modal.component.html',
  styleUrl: './create-team-modal.component.scss',
})
export class CreateTeamModalComponent {
  @Input() teamMember?: TeamMember; // Pass team member for editing

  @Output() close = new EventEmitter<void>();
  teamForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamMemberService
  ) {}

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      name: [this.teamMember?.name ?? '', Validators.required],
      role: [this.teamMember?.role ?? '', Validators.required],
      bio: [this.teamMember?.bio ?? ''],
      profile_image: [this.teamMember?.profile_image ?? ''],
      social_media_links: this.fb.array([]),
    });

    if (this.teamMember?.social_media_links?.length) {
      this.teamMember.social_media_links.forEach((link) => this.addSocialLink(link));
    }
  }

  get socialLinks() {
    return this.teamForm.get('social_media_links') as FormArray;
  }

  addSocialLink(link?: SocialMediaLink) {
    this.socialLinks.push(
      this.fb.group({
        platform: [link?.platform ?? '', Validators.required],
        url: [link?.url ?? '', Validators.required],
      })
    );
  }

  removeSocialLink(index: number) {
    this.socialLinks.removeAt(index);
  }

  submitForm() {
    if (this.teamForm.invalid) return;

    const payload = this.teamForm.value;

    if (this.teamMember) {
      // Update existing
      this.teamService.updateTeamMember(this.teamMember.id, payload).subscribe({
        next: () => this.close.emit(),
        error: (err) => console.error('Error updating:', err),
      });
    } else {
      // Create new
      this.teamService.createTeamMember(payload).subscribe({
        next: () => this.close.emit(),
        error: (err) => console.error('Error creating:', err),
      });
    }
  }

  closeModal() {
    this.close.emit();
  }
}
