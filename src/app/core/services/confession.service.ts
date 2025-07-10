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
}
