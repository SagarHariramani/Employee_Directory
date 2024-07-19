import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavbarComponent } from '../components/side-navbar/side-navbar.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,SideNavbarComponent,SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EmployeeDirectory';
  isExpanded = true;
  router: any;
  collapse(isCollapsed: boolean) {
    this.isExpanded = isCollapsed;
  }
  
}
