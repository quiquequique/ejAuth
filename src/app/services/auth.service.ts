import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyAG4ukzHT4qolt0WEO6I9x2p0Gv6XF8S4I';
  userToken: string;

  // crear usuario    https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // login   https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient ) { }

  logout() {}

  login( usuario: UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${ this.apiKey }`, authData ).pipe(
        map( res => {
          console.log('entro en el map de RXJS');
          this.guardarToken( res['idToken']);
          return res;
        })
      );
  }

  nuevoUsuario( usuario: UsuarioModel ) {

    const authData = {
      // ...usuario, podria ser tambien con epread operator
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`, authData
    ).pipe(
      map( res => {
        console.log('entro en el map de RXJS');
        this.guardarToken( res['idToken']);
        return res;
      })
    );
  }

  private guardarToken( idToken: string) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

  }

  leerToken() {
    if ( localStorage.getItem( 'token' )) {
      this.userToken = localStorage.getItem( 'token' );
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
}
