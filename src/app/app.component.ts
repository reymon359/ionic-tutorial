import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
// import { IntroduccionPageModule } from '../pages/introduccion/introduccion.module';

//providers
import { AjustesProvider } from "../providers/ajustes/ajustes";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = HomePage;
  rootPage: any;

  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private ajustesProv: AjustesProvider) {
    platform.ready().then(() => {
      this.ajustesProv.cargarStorage()
        .then(() => {
          if (this.ajustesProv.ajustes.mostrarTutorial) {
            this.rootPage = "IntroduccionPage";
          } else {
            this.rootPage = HomePage;
          }
          this.platform.pause.subscribe(()=>{ //el pause es para cuando la aplicacion se queda en segundo plano
              console.log("la applicacion se detendrá");
          });
          this.platform.resume.subscribe(()=>{//la aplicacion continua
             console.log("la aplicacion va a continuar");
          });
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          statusBar.styleDefault();
          splashScreen.hide();
        })

    });
  }
}
