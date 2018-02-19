import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  tema: any;
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargarAjsutes();
   }

  guadarAjustes() {
    // console.log('Guardando en local Storaga '  + this.ajustes.tema);
    localStorage.setItem( 'ajustes', JSON.stringify( this.ajustes ) );
  }

  cargarAjsutes() {

    if ( localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      // console.log('Cargado del Local Storage ' + this.ajustes.tema);
      this.aplicarTema( this.ajustes.tema );
    } else {
      // console.log('Usando Valores por defecto ');
      this.aplicarTema( this.ajustes.tema );
    }
  }

  aplicarTema( tema: string ) {

    let url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url );

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guadarAjustes();



  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
