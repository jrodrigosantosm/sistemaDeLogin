import { Component } from '@angular/core';

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

  constructor() {
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

  }
}
