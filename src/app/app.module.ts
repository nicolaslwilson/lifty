import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Facebook } from '@ionic-native/facebook'
import { GooglePlus } from '@ionic-native/google-plus'
import { TwitterConnect } from '@ionic-native/twitter-connect'

// diretives and providers
import { Loader } from '../providers/loader';
import { Nl2br } from '../pipes/nl2br';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { AuthenticatorService } from '../providers/authenticator';

// Custom pages generated by ionic generator
import { Menu } from '../pages/menu/menu';
import { HomePage } from '../pages/menu/home/home.page';
import { WorkoutPage } from '../pages/menu/workout/workout.page';
import { WorkoutHistoryPage } from '../pages/menu/workout-history/workout-history.page';
// Authentication
import { LoginPage } from '../pages/authentication/login/login';
import { RegistrationPage } from '../pages/authentication/registration/registration';

import { Config } from './config'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WorkoutPage,
    WorkoutHistoryPage,
    Menu,
    LoginPage,
    RegistrationPage,
    Nl2br,
    CapitalizePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(Config.FIREBASE_CONFIG)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Menu,
    LoginPage,
    RegistrationPage,
    HomePage,
    WorkoutPage,
    WorkoutHistoryPage,
  ],
  providers: [
    Loader,
    Facebook,
    GooglePlus,
    TwitterConnect,
    AngularFireAuth,
    AngularFireDatabase,
    AuthenticatorService
  ]
})
export class AppModule {}
