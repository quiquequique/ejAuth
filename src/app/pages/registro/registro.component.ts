import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  rememberUser = false;

  constructor( private auth: AuthService,
               private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();


  }

  onSubmit( form: NgForm) {

    if ( form.invalid ) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espera por Favor..'});
    Swal.showLoading();

    // console.log( 'envia formulario' );
    // console.log( this.usuario );
    // console.log( form );

    this.auth.nuevoUsuario( this.usuario ).subscribe( res => {
      console.log( res );
      Swal.close();

      if ( this.rememberUser ) {
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');

    }, ( err ) => {
      console.log( 'Error= ' + err.error.error.message );

      Swal.fire({
        title: 'Error de carga!',
        icon: 'error',
        text: err.error.error.message});
      Swal.showLoading();
    });


  }


}
