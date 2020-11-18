import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( private auth: AuthService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();


   }

  onSubmit( form: NgForm) {

    if ( form.invalid ) {
      return;
    }

    // console.log( 'envia formulario' );
    // console.log( this.usuario );
    // console.log( form );

    this.auth.nuevoUsuario( this.usuario ).subscribe( res => {
      console.log( res );

    }, ( err ) => {
      console.log( 'Error= ' + err.error.error.message );

    });


  }


}
