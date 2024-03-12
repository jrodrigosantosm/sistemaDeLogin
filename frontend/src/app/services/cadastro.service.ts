// cadastro.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }


  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar`, usuario);
  }

  loginAutomatico(usuario: any): Observable<any> {
    console.log(usuario)
    return this.http.post(`${this.apiUrl}/login`, usuario);
  }

  login(usuario: any): Observable<any> {
    console.log(usuario)
    return this.http.post(`${this.apiUrl}/login`, usuario);
  }
}

