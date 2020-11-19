import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { switchAll } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  rememberUser: boolean = false;

  constructor( private auth: AuthService,
               private router: Router) { }

  ngOnInit() {

    if ( localStorage.getItem( 'email' ) ) {

      this.usuario.email = localStorage.getItem( 'email' );
      this.rememberUser = true;

    }
  }

  login( form: NgForm) {

    if ( form.invalid ) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espera por Favor..'});
    Swal.showLoading();


    // console.log( this.usuario );
    // console.log( form );

    this.auth.login( this.usuario ).subscribe( res => {
      console.log( res );
      Swal.close();  // cierra la alerta de carga de sw2
      
      if ( this.rememberUser ) {
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');

    }, (err) => {
      console.log( err.error.error.message );

      Swal.fire({
        title: 'Error de autenticación!',
        icon: 'error',
        text: err.error.error.message});
      Swal.showLoading();

    });


  }

}
