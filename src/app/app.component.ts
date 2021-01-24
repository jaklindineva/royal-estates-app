import { Component, OnInit, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { EstateHomePage, LocationsPage, MyEstatesPage } from '../pages/pages';
import { UserSettingsProvider } from '../providers/user-settings/user-settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp  implements OnInit {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyEstatesPage;

  pages: Array<{title: string, component: any}>;

  saved = [];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public userSettings: UserSettingsProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }
  ngOnInit(): void {
    console.log("NG ON INTI");
    this.userSettings.getAllSaved().then(data => this.saved = data);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goToLocations() {
    this.nav.push(LocationsPage);
  }

  itemTapped($event, saved){
    this.nav.push(EstateHomePage, {estate: saved.estate});
  }
}
