import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RoyalEstateApiProvider } from '../../providers/royal-estate-api/royal-estate-api';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';
import * as _ from 'lodash';

/**
 * Generated class for the OverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})
export class OverviewPage {

  estate: any;
  isSaved = false;
  private locationData: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertController: AlertController,
              public royalEstateApi: RoyalEstateApiProvider,
              public userSettings: UserSettingsProvider,
              public toastController: ToastController
              ) {
    this.estate = this.navParams.get('estate');
    console.log(this.estate);
  }

  ionViewDidLoad() {
    this.locationData = this.royalEstateApi.getCurrentLocation();
    console.log("location data");
    console.log(this.locationData);
    this.userSettings.isSavedEstate(this.estate.id).then(value => this.isSaved = value);
  }

  refresh(refresher){
    this.royalEstateApi.refreshCurrentLocation().subscribe((data) => {
      console.log("Data" );
      console.log(data);
      console.log(this.estate);
      let refreshed = _.find(data.estates, e => e.id == this.estate.id);
      this.estate = refreshed;
      refresher.complete();
    });
  }

  toggleSave(){ //TODO
    if(this.isSaved) {
      let confirm = this.alertController.create({
        title: "Remove from saved?",
        message: "Are you sure you want to remove from saved estates?",
        buttons: [
          {
            text: "YES",
            handler: () => {
              this.isSaved = false;
              let toast = this.toastController.create({
                message: "You have removed the estate from saved!",
                duration: 2000,
                position: "bottom"
              });
              toast.present();
              this.userSettings.removeEstate(this.estate);
            }
          },
          {
            text: "NO"
          }
        ]
      });
      confirm.present();
    } else {
      this.isSaved = true;

      this.userSettings.saveEstate(
        this.estate,
        this.locationData.location.id,
        this.locationData.location.name
      );


    }
  }

}
