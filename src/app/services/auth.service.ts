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
  userToken: string = '';

  // crear usuario    https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // login   https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient ) { }

  logout() {
    localStorage.removeItem( 'token' );
  }

  login( usuario: UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${ this.apiKey }`, authData ).pipe(
        map( res => {  // funciona parecido a un midleware, pasa por la funcion, ejecuta y devuelve la misma respuesta que recibio.
          console.log('entro en el map de RXJS');
          this.guardarToken( res[`idToken`]);
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
        this.guardarToken( res[`idToken`]);
        return res;
      })
    );
  }

  private guardarToken( idToken: string) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString());

  }

  leerToken() {
    if ( localStorage.getItem( 'token' )) {
      this.userToken = localStorage.getItem( 'token' );
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  isAuthenticated(): boolean {
    // console.log(this.userToken);

    if ( this.userToken.length < 2) {
      return false;
    }
    const expira = Number(localStorage.getItem('expira'));
    console.log(expira);

    const now = new Date();
    console.log(now);

    now.setTime(expira);
    console.log(now);


    if (now > new Date()) {
      return true;
    } else {
      return false;
    }

  }
}

