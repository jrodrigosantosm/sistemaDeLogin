import { Component } from '@angular/core';
import { AuthService } from '../../services/Auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public authService: AuthService) { }

  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }
}


