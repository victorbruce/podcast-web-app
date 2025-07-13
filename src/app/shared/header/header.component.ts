import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/core.module';
import { SearchComponent } from '../../features/public/search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  isLoggedIn = signal(this.authService.isAuthenticated());
  menuOpen = false;
  searchOpen = false;

  toggleTheme() {
    // implement ThemeService logic or placeholder
    console.log('Theme toggled');
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.isLoggedIn.set(false);
    });
  }

  onSearch(term: string) {
    console.log('Search term:', term);
    // You can forward this to a search service or state
  }

  toggleSearchModal() {
    this.searchOpen = !this.searchOpen;
  }
}
