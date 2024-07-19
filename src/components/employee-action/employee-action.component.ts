import { Component, Input } from '@angular/core';
import { ExportButtonComponent } from '../export-button/export-button.component';
import { Employee } from '../../Models/employee';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-action',
  standalone: true,
  imports: [ExportButtonComponent,RouterLink],
  templateUrl: './employee-action.component.html',
  styleUrl: './employee-action.component.css'
})
export class EmployeeActionComponent {

  @Input() filteredEmployees!: Employee[];
  exportEmployeesDetails(): void {
    const csv = this.convertArrayOfObjectsToCSV(this.filteredEmployees);
    this.downloadCSV(csv);
  }
  convertArrayOfObjectsToCSV(data: Employee[]): string {
    const columnseperator = ',';
    const lineseperator = '\n';
    const keys: string[] = Object.keys(data[0]);

    let result: string = '';
    result += keys.join(columnseperator);
    result += lineseperator;

    data.forEach((item) => {
      let ctr = 0;
      keys.forEach(key => {
        if (ctr > 0) result += columnseperator;
        result += item[key as keyof Employee];
        ctr++;
      });
      result += lineseperator;
    });

    return result;
  }
  downloadCSV(csv: string): void {
    const filename = 'Employess.csv';
    const csvFile = new Blob([csv], { type: 'text/csv' });
    const downloadLink = document.createElement('a');

    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();

  }
}
