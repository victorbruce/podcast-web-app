import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private theme: Theme = 'light';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadTheme();
  }

  private loadTheme(): void {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved && this.isValidTheme(saved)) {
      this.theme = saved;
    }
    this.applyTheme();
  }

  setTheme(theme: Theme): void {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme();
  }

  toggleTheme(): void {
    if (this.theme === 'light') {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  private applyTheme(): void {
    this.renderer.setAttribute(document.documentElement, 'data-theme', this.theme);
  }

  getCurrentTheme(): Theme {
    return this.theme;
  }

  private isValidTheme(value: any): value is Theme {
    return ['light', 'dark'].includes(value);
  }
}
