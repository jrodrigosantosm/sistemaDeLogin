import { Component } from '@angular/core';
import { CadastroService } from '../../services/cadastro.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

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
    private modalService: NgbModal
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
        this.openErrorModal();
        console.error('Erro no login automático:', error);
      }
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  openErrorModal() {
    const modalRef = this.modalService.open(ErrorModalComponent);
    modalRef.componentInstance.message = 'Mensagem de erro aqui';
  }
}
