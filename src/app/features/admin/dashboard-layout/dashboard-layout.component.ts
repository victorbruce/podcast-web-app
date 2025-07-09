import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SideBarComponent } from '../dashboard/components/side-bar/side-bar.component';
import { HeaderComponent } from '../dashboard/components/header/header.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [SideBarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {}
