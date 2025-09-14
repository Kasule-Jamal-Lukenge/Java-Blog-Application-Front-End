import { Component, computed } from '@angular/core';
import { AuthService } from '../../../auth/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn !:typeof this.authService.isLoggedIn;

  constructor(private authService: AuthService, private router: Router){
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  logout(): void{
    this.authService.logout();
  }
}
