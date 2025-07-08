import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/core.module';
import { User } from '../../../core/core.module';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  user: User | null = null;

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.user = user;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('User logged out');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed:', err.message);
        // Optionally still navigate to login
        this.router.navigate(['/login']);
      },
    });
  }
}
