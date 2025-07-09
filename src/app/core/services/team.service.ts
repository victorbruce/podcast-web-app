import { Injectable, inject } from '@angular/core';
import { map, Observable, BehaviorSubject, tap } from 'rxjs';

import { ApiClientService } from './api-client.service';
import { TeamMember, TeamMemberResponse } from '../core.module';

@Injectable({
  providedIn: 'root',
})
export class TeamMemberService {
  private apiClient = inject(ApiClientService);
  private teamMembersSubject = new BehaviorSubject<TeamMember[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  teamMembers$ = this.teamMembersSubject.asObservable();
  total$ = this.totalSubject.asObservable();

  constructor() {}

  getTeamMembers(): Observable<TeamMemberResponse> {
    return this.apiClient.get<TeamMemberResponse>('/team-members').pipe(
      tap((response) => {
        this.teamMembersSubject.next(response.data);
        this.totalSubject.next(response.meta.total ?? response.data.length);
      })
    );
  }

  get currentTeamMembers(): TeamMember[] {
    return this.teamMembersSubject.getValue();
  }

  get totalTeamMembers(): number {
    return this.totalSubject.getValue();
  }
}
