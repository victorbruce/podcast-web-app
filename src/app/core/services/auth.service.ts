import { Injectable, inject } from '@angular/core';
import { Observable, BehaviorSubject, tap, map, of, catchError, throwError } from 'rxjs';

import { ApiClientService } from './api-client.service';
import {
  User,
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from '../core.module';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiClient = inject(ApiClientService);
  private _currentUser = new BehaviorSubject<User | null>(null);
  public currentUser$ = this._currentUser.asObservable();

  constructor() {}

  signup(data: RegisterRequest): Observable<RegisterResponse> {
    return this.apiClient.post<RegisterResponse, RegisterRequest>('/register', data);
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.apiClient.post<LoginResponse, LoginRequest>('/login', data).pipe(
      tap((response) => {
        const token = response?.data?.token;
        const user = response?.data?.user;

        if (token && user) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this._currentUser.next(user);
        } else {
          throw new Error('Login response is missing token or user data.');
        }
      })
    );
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): Observable<{ message: string }> {
    const token = this.getToken();

    if (!token) {
      this.clearSession();
      return of({ message: 'No token found. User already logged out' });
    }

    return this.apiClient.post<{ message: string }, null>('/logout', null).pipe(
      tap(() => this.clearSession()),
      catchError((error) => {
        this.clearSession();
        return throwError(() => new Error(error.message));
      })
    );
  }

  private clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._currentUser.next(null);
  }
}
