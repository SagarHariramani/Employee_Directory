import { Component, EventEmitter, Output, output } from '@angular/core';
import { SideNavbarOptionsComponent } from '../side-navbar-options/side-navbar-options.component';
import { CompanyLogoComponent } from '../company-logo/company-logo.component';
import { UpdateAlertBoxComponent } from '../update-alert-box/update-alert-box.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [SideNavbarOptionsComponent,CompanyLogoComponent,UpdateAlertBoxComponent,CommonModule],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.css'
})
export class SideNavbarComponent {
  @Output() isCollapsed= new EventEmitter<boolean>();
  isExpanded = true;
  collapse(isCollapsed: boolean) {
    this.isExpanded = isCollapsed;
    this.isCollapsed.emit(this.isExpanded);
  }
}
