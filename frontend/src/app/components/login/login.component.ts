import { Component } from '@angular/core';
import { CadastroService } from '../../services/cadastro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public email: string;
  public senha: string;
  public ususario: any;

  constructor(
    private cadastroService: CadastroService,
    private router: Router,
  ) {
    this.email = '';
    this.senha = '';


  }


  login() {
    this.ususario = {
      "email": this.email,
      "password": this.senha
    }

    this.cadastroService.login(this.ususario).subscribe(
      (response) => {
        console.log('Login bem-sucedido!', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Erro no login automático:', error);
      }
    );
  }
}
