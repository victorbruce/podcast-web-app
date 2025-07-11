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

  createTeamMember(data: Partial<TeamMember>): Observable<TeamMember> {
    return this.apiClient
      .post<{ status: string; message: string; data: TeamMember }>('/team-members', data)
      .pipe(
        map((res) => res.data),
        tap((createdMember) => {
          const updatedList = [...this.currentTeamMembers, createdMember];
          this.teamMembersSubject.next(updatedList);
          this.totalSubject.next(updatedList.length);
        })
      );
  }

  updateTeamMember(id: number, data: Partial<TeamMember>): Observable<TeamMember> {
    const fullData: TeamMember = { ...(data as TeamMember), id };
    return this.apiClient
      .put<{
        status: string;
        message: string;
        data: TeamMember;
      }>(`/team-members/${id}`, fullData as any)
      .pipe(
        map((res) => res.data), // ✅ Extract the updated team member
        tap((updatedMember) => {
          const updatedList = this.currentTeamMembers.map((member) =>
            member.id === id ? updatedMember : member
          );
          this.teamMembersSubject.next(updatedList);
        })
      );
  }

  // updateTeamMember(id: number, data: Partial<TeamMember>): Observable<TeamMember> {
  //   const fullData: TeamMember = { ...(data as TeamMember), id };
  //   return this.apiClient.put<TeamMember>(`/team-members/${id}`, fullData).pipe(
  //     tap((updatedMember) => {
  //       const updatedList = this.currentTeamMembers.map((member) =>
  //         member.id === id ? updatedMember : member
  //       );
  //       this.teamMembersSubject.next(updatedList);
  //     })
  //   );
  // }

  deleteTeamMember(id: number): Observable<void> {
    return this.apiClient.delete(`/team-members/${id}`).pipe(
      tap(() => {
        const updatedList = this.currentTeamMembers.filter((member) => member.id !== id);
        this.teamMembersSubject.next(updatedList);
        this.totalSubject.next(updatedList.length);
      })
    );
  }
}
