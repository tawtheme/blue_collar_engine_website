import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-frontend-layout',
  templateUrl: './frontend-layout.component.html',
  styleUrls: ['./frontend-layout.component.scss'],
})
export class FrontendLayoutComponent {
  currentYear: number = new Date().getFullYear();
  crmBaseUrl: any = environment.crmBaseUrl;

  constructor(private _route: Router) {
    
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
      if (window.scrollY > 50) {
        mainHeader.classList.add('sticky-active');
      } else {
        mainHeader.classList.remove('sticky-active');
      }
    } else {
      //console.log('Main header not found'); // Debugging log
    }
  }

  redirectToLogin(): void {
    window.location.href = this.crmBaseUrl;
  }
}
