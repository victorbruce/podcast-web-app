import { Component, inject, OnInit } from '@angular/core';
import { Theme, ThemeService, User } from '../../../../../core/core.module';
import { AuthService } from '../../../../../core/core.module';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);
  currentTheme!: Theme;
  isOpen = false;
  user: User | null = null;

  constructor() {
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.user = user;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  onOpenSidebar() {
    this.isOpen = !this.isOpen;
  }
}
