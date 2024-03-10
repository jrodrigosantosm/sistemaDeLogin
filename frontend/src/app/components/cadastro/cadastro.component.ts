import { Component } from '@angular/core';
import { CadastroService } from '../../services/cadastro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  public email: string;
  public nome: string;
  public senha: string;
  public cadastro: any;

  constructor(
    private cadastroService: CadastroService,
    private router: Router,
  ) {
    this.email = '';
    this.nome = '';
    this.senha = '';
  }

  cadastrar(): void {
    this.cadastro = {
      "name": this.nome,
      "email": this.email,
      "password": this.senha
    }

    let login = {
      "email": this.cadastro.email,
      "password": this.cadastro.password
    }

    this.cadastroService.cadastrarUsuario(this.cadastro).subscribe(
      response => {
        console.log('Cadastro realizado com sucesso:', response);
        this.loginAutomatico(login);
      },
      error => {
        console.error('Erro ao cadastrar usuário:', error);
      }
    );
  }

  loginAutomatico(usuario: any) {
    this.cadastroService.loginAutomatico(usuario).subscribe(
      (response) => {
        console.log('Login automático bem-sucedido!');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Erro no login automático:', error);
      }
    );
  }
}
