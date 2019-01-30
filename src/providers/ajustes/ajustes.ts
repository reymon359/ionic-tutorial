import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Platform } from "ionic-angular";

@Injectable()
export class AjustesProvider {
  ajustes = {
    mostrarTutorial: true
  }
  constructor(private platform: Platform, private storage: Storage) {
    console.log('Hello AjustesProvider Provider');
  }
  cargarStorage() {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) { //dispositivo
        console.log("inicializando storage");
        this.storage.ready()
          .then(() => {//cuando el storage este listo
            console.log("storage listo");
            this.storage.get("ajustes")//pido los ajustes
              .then(ajust => {//cuando me devuelve los ajustes. el nombre asjust da igual
                // simplemente es lo que devuelbe la promesa
                if (ajust) {
                  this.ajustes = ajust;

                } else {

                }
                resolve();

              })
          })
      } else {  //escritorio
        if (localStorage.getItem("ajustes")) {
          this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
        }
        resolve();
      }
    });
    return promesa;


  }
  guardarStorage() {
    if (this.platform.is("cordova")) { //dispositivo
      this.storage.ready().then(() => {
        this.storage.set("ajustes", this.ajustes);
      })
    } else {  //escritorio
      localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
    }
  }
}
