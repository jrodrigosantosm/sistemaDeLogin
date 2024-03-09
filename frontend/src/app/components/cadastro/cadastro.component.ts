import { Component } from '@angular/core';
import { CadastroService } from '../../services/cadastro.service';

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

  constructor(private cadastroService: CadastroService) {
    this.email = '';
    this.nome = '';
    this.senha = '';
  }

  cadastrar(): void {
    this.cadastro = {
      "nome": this.nome,
      "email": this.email,
      "password": this.senha
    }
    this.cadastro = JSON.stringify(this.cadastro);
    console.log(this.cadastro);

    this.cadastroService.cadastrarUsuario(this.cadastro).subscribe(
      response => {
        console.log('Cadastro realizado com sucesso:', response);
        // Faça o que for necessário após o sucesso do cadastro
      },
      error => {
        console.error('Erro ao cadastrar usuário:', error);
        // Trate o erro conforme necessário
      }
    );
  }
}
