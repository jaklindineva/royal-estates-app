import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { RoyalEstateApiProvider } from '../../providers/royal-estate-api/royal-estate-api';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';
import { EstateHomePage } from '../estate-home/estate-home';
import { LocationsPage } from '../pages';


/**
 * Generated class for the MyEstatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-estates',
  templateUrl: 'my-estates.html',
})
export class MyEstatesPage {
  saved = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingController: LoadingController,
              public royalEstateApi: RoyalEstateApiProvider,
              public userSettings: UserSettingsProvider) {
  }

  ionViewDidLoad() {
    console.log("DID LOAD");

    this.userSettings.getAllSaved().then(data => {
      console.log("data");
      console.log(data);
      this.saved = data;
    });

    console.log('ionViewDidLoad MyEstatesPage');
  }

  goToLocations(){
    this.navCtrl.push(LocationsPage);
  }

  savedTapped($event, saved){
    console.log('savedTapped'); 

    let loader = this.loadingController.create({
        content: 'Getting data...'
    });
    loader.present();
    this.royalEstateApi.getLoactionData(saved.locationId)
        .subscribe(l => {
            loader.dismiss();
            this.navCtrl.push(EstateHomePage, {estate: saved.estate});
        });
  }

}
