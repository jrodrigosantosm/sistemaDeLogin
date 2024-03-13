import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/Auth.service';
import { City } from '../../models/City.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cities: City[] | undefined;
  selectedCity: City | undefined;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }
  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }
}


