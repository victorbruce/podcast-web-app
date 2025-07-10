import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { AuthService } from '../../../../../core/core.module';
import { User } from '../../../../../core/core.module';

@Component({
  selector: 'app-side-bar',
  imports: [RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
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
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Logout failed:', err.message);
        // Optionally still navigate to login
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
