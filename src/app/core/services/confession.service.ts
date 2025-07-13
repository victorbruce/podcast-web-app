import { Injectable, inject } from '@angular/core';
import { map, Observable, BehaviorSubject, tap } from 'rxjs';

import { ApiClientService } from './api-client.service';
import { Confession, ConfessionResponse } from '../core.module';

@Injectable({
  providedIn: 'root',
})
export class ConfessionService {
  private apiClient = inject(ApiClientService);

  private confessionsSubject = new BehaviorSubject<any[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  confessions$ = this.confessionsSubject.asObservable();
  total$ = this.totalSubject.asObservable();

  constructor() {}

  getConfessions(): Observable<ConfessionResponse> {
    return this.apiClient.get<ConfessionResponse>('/confessions').pipe(
      tap((response) => {
        this.confessionsSubject.next(response.data);
        this.totalSubject.next(response.meta.total ?? response.data.length);
      })
    );
  }

  get currentConfessions(): Confession[] {
    return this.confessionsSubject.getValue();
  }

  get totalConfessions(): number {
    return this.totalSubject.getValue();
  }

  createConfession(confession: Confession): Observable<ConfessionResponse> {
    return this.apiClient.post<ConfessionResponse>('/confessions', confession).pipe(
      tap((response) => {
        const updated = [response.data, ...this.confessionsSubject.getValue()];
        this.confessionsSubject.next(updated);
        this.totalSubject.next(this.totalSubject.getValue() + 1);
      })
    );
  }

  getConfession(id: number): Observable<ConfessionResponse> {
    return this.apiClient.get<ConfessionResponse>(`/confessions/${id}`);
  }

  deleteConfession(id: number): Observable<any> {
    return this.apiClient.delete(`/confessions/${id}`).pipe(
      tap(() => {
        const updated = this.confessionsSubject.getValue().filter((c) => c.id !== id);
        this.confessionsSubject.next(updated);
        this.totalSubject.next(updated.length);
      })
    );
  }
}
