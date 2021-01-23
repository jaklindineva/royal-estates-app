import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoyalEstateApiProvider } from '../../providers/royal-estate-api/royal-estate-api';

declare var window: any;
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  map: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public royalEstateApi: RoyalEstateApiProvider) {
  }

  ionViewDidLoad() {
    let estate  = this.navParams.data.estate;
    this.map = {
      lat: estate.latitude,
      lng: estate.longitude,
      zoom: 12
    };
  }

  getDirections() { 
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
  }

}
