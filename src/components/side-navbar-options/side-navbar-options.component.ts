import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-navbar-options',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule,RouterModule],
  templateUrl: './side-navbar-options.component.html',
  styleUrl: './side-navbar-options.component.css'
})
export class SideNavbarOptionsComponent implements OnInit{
  currentRoute: string | undefined;
  isEmployeeTabActive: boolean = false;
  isRoleTabActive: boolean = false;
  @Input() isExpanded!: boolean ;

  constructor(private router: Router) { }
  ngOnInit() {
    this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            this.currentRoute = event.url;
            if(this.currentRoute.startsWith('/employees')){
              this.isRoleTabActive = false;
              this.isEmployeeTabActive = true;
            }
            if(this.currentRoute.startsWith('/roles')){
              this.isEmployeeTabActive = false;
              this.isRoleTabActive = true;
            }
        }
    });
  }
  
}
