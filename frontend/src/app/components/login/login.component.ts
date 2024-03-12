import { Component } from '@angular/core';
import { CadastroService } from '../../services/cadastro.service';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { AuthService } from '../../services/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public email: string;
  public senha: string;
  public ususario: any;
  private tokenKey = 'access_token'

  constructor(
    private cadastroService: CadastroService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.email = '';
    this.senha = '';
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.ususario = {
      "email": this.email,
      "password": this.senha
    }

    this.cadastroService.login(this.ususario).subscribe(
      (response) => {
        this.router.navigate(['/']);
        this.setToken(response.token);
      },
      (error) => {
        console.error('Erro no login automático:', error);
      }
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
