import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { RoyalEstateApiProvider } from '../../providers/royal-estate-api/royal-estate-api';
import { EstatesPage } from '../estates/estates';

/**
 * Generated class for the LocationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {

  locations: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public royalEstateApi: RoyalEstateApiProvider,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationsPage');

    let loader = this.loadingController.create({
      content: 'Getting locations...'
    });

    loader.present().then(() => {
      this.royalEstateApi.getLocations().subscribe(
        locations => {
          this.locations = locations;
          loader.dismiss();
      });
    });

  }

  itemTapped($event, location) {
    console.log("item tapped" + location);
    this.navCtrl.push(EstatesPage, location);
  }

}
