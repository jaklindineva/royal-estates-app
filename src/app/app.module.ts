import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EstateHomePage, EstatesPage, LocationsPage, MapPage, MyEstatesPage, OverviewPage, SimilarPage } from '../pages/pages';
import { RoyalEstateApiProvider } from '../providers/royal-estate-api/royal-estate-api';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { UserSettingsProvider } from '../providers/user-settings/user-settings';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    EstateHomePage,
    EstatesPage,
    LocationsPage,
    MapPage,
    MyEstatesPage,
    OverviewPage,
    SimilarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyApDyHfVZbbCjO0O1nf_pgv4YZf8RVqfmA'
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    EstateHomePage,
    EstatesPage,
    LocationsPage,
    MapPage,
    MyEstatesPage,
    OverviewPage,
    SimilarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RoyalEstateApiProvider,
    UserSettingsProvider
  ]
})
export class AppModule {}
