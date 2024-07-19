import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-company-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-logo.component.html',
  styleUrl: './company-logo.component.css'
})
export class CompanyLogoComponent {
  @Output() isExpanded= new EventEmitter<boolean>();
  expanded:boolean=true;
  
  collapse() {
    this.expanded = !this.expanded;
    this.isExpanded.emit(this.expanded);
  }
}
