import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { RoyalEstateApiProvider } from '../../providers/royal-estate-api/royal-estate-api';
import { EstateHomePage } from '../estate-home/estate-home';
import * as _ from 'lodash';

/**
 * Generated class for the EstatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estates',
  templateUrl: 'estates.html',
})
export class EstatesPage {

  estates: any = [];
  selectedLocation: any;
  private allEstates: any;
  private allEstatesRegions: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public royalEstateApi: RoyalEstateApiProvider,
              public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstatesPage');

    this.selectedLocation = this.navParams.data;

    let loader = this.loadingController.create({
      content: 'Getting data...'
    });

    loader.present().then(() => {
      this.royalEstateApi.getLoactionData(this.selectedLocation.id).subscribe(data => {
        this.allEstates = data.estates;
        // subdivide the estates into regions
        this.allEstatesRegions =
          _.chain(data.estates)
          .groupBy('region')
          .toPairs()
          .map(item => _.zipObject(['regionName', 'regionEstates'], item))
          .value();
          this.estates = this.allEstatesRegions;

          loader.dismiss();   
      });
    });

  }

  itemTapped($event, estate) {
    this.navCtrl.push(EstateHomePage, {estate: estate});
  }

}
