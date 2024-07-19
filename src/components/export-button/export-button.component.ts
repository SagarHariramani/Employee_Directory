import { Component, Input } from '@angular/core';
import { Employee } from '../../Models/employee';

@Component({
  selector: 'app-export-button',
  standalone: true,
  imports: [],
  templateUrl: './export-button.component.html',
  styleUrl: './export-button.component.css'
})
export class ExportButtonComponent {
  @Input() filteredEmployees!: Employee[];

  

}
